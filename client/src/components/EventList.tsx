import React from "react";
import { Card, Menu } from "antd";
import "./EventList.scss";
import config from "../config";

type Props = {
  events: IEvent[];
};

const EventList: React.FC<Props> = ({ events }) => {
  console.log(events);
  return (
    <div className="eventList">
      {events?.map((event, index) => (
        <Card className="eventItem" key={`event-${index}`}>
          <div className="eventImage">
            <img src={`${config.apiBaseURL}/images/${event?.img}`}></img>
          </div>
          <div className="eventText">
            <p>
              <b>License Plate</b>
              <br />
              {event?.licensePlateNo}
            </p>
            <p>
              <b>Total Time</b>
              <br />
              {event?.duration}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventList;
