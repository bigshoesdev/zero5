import { Request, Response } from "express";
import { EventInstance, EventAttributes } from "../models/event";
import moment from "moment";

class EventController {
  async getEvents(req: Request, res: Response) {
    try {
      const endDate = moment(req.query.endDate as string)
        .set("hours", 23)
        .set("minutes", 59);
      const startDate = moment(req.query.startDate as string)
        .set("hours", 0)
        .set("minutes", 0);

      const searchKey = req.query.searchKey as string;
      const records = await EventInstance.findAll({});

      let eventList = records.map((record) => {
        return record.toJSON() as EventAttributes;
      });

      eventList = eventList.filter((eventItem) => {
        let isInRange = moment(eventItem.timestamp).isBetween(
          startDate,
          endDate
        );

        if (searchKey && !eventItem.license_plate_number.includes(searchKey)) {
          isInRange = false;
        }

        return isInRange;
      });

      const eventsMapByLicenseNo: {
        [index: string]: {
          img?: string;
          licensePlateNo?: string;
          duration?: string;
          events: any[];
        };
      } = {};

      for (const eventItem of eventList) {
        const license_plate_number = eventItem.license_plate_number;
        const img = eventItem.img;

        const data = {
          ...eventItem,
          date: moment(eventItem.timestamp).format("YYYY-MM-DD HH:mm:ss"),
        };

        if (license_plate_number in eventsMapByLicenseNo) {
          eventsMapByLicenseNo[license_plate_number].events.push(data);
        } else {
          eventsMapByLicenseNo[license_plate_number] = {
            img,
            licensePlateNo: license_plate_number,
            events: [data],
          };
        }
      }

      for (const licenseNo in eventsMapByLicenseNo) {
        const licenseEventMap = eventsMapByLicenseNo[licenseNo];
        licenseEventMap.events = licenseEventMap.events.sort(
          (event1: EventAttributes, event2: EventAttributes) =>
            event1.timestamp - event2.timestamp
        );

        let duration = 0;

        const events = licenseEventMap.events;

        events.map((event, index) => {
          // looping the 'exit' event and calculate the duration
          if (event.device_location == "EXIT") {
            const previousEvent = events[index - 1];

            if (previousEvent && previousEvent.device_location == "ENTER") {
              duration += event.timestamp - previousEvent.timestamp;
            }

            // when the first event is 'exit' and has no previous 'exit' event, calculate it from the start date
            if (!previousEvent && index == 0) {
              duration += event.timestamp - startDate.toDate().getTime();
            }
          }

          // when the last event is 'enter' and has no exit in the time range, calculate it from the end date
          if (event.device_location == "ENTER" && index == events.length - 1) {
            duration += endDate.toDate().getTime() - event.timestamp;
          }
        });

        let tempTime = moment.duration(duration);
        licenseEventMap.duration =
          tempTime.hours() + " hours " + tempTime.minutes() + " minutes";
      }

      return res.json({
        events: Object.values(eventsMapByLicenseNo).map((data) => ({
          licensePlateNo: data.licensePlateNo,
          img: data.img,
          duration: data.duration,
        })),
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

export default new EventController();
