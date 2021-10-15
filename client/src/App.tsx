import React, { useEffect, useState } from "react";
import "./App.scss";
import { getEvents } from "./API";
import { Col, Radio, Row, DatePicker } from "antd";
import EventList from "./components/EventList";
import Search from "antd/lib/input/Search";
import moment from "moment";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

const dateFilterOptions = [
  { label: "3 days", value: "3d" },
  { label: "1 week", value: "1w" },
  { label: "2 week", value: "2w" },
];

const App: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [startDate, setStartDate] = useState(moment("2021-10-01", dateFormat));
  const [endDate] = useState(moment("2021-10-01", dateFormat));
  const [dateFilterOption, setDateFilterOption] = useState<string>(
    dateFilterOptions[0].value
  );
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (dateFilterOption === "3d") {
      setStartDate(endDate.clone().subtract(3, "days"));
    } else if (dateFilterOption === "1w") {
      setStartDate(endDate.clone().subtract(7, "days"));
    } else if (dateFilterOption === "2w") {
      setStartDate(endDate.clone().subtract(14, "days"));
    }
  }, [dateFilterOption]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchEvents(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD"),
        searchKey
      );
    }
  }, [startDate, endDate, searchKey]);

  const fetchEvents = (
    startDate: string,
    endDate: string,
    searchKey: string
  ): void => {
    getEvents(startDate, endDate, searchKey)
      .then(({ data: { events } }: IEvent[] | any) => setEvents(events))
      .catch((err: Error) => console.log(err));
  };

  console.log(startDate.format("YYYY-MM-DD"), "QQ" + searchKey, events);
  return (
    <main className="App">
      <Row>
        <Col md={8} className="Header">
          <Search
            size="large"
            placeholder="Input search text"
            onSearch={(v) => setSearchKey(v)}
            enterButton
          />
        </Col>
        <Col md={8} className="Header">
          <Radio.Group
            options={dateFilterOptions}
            value={dateFilterOption}
            optionType="button"
            onChange={(e) => {
              setDateFilterOption(e.target.value);
            }}
          />
        </Col>
        <Col md={8} className="Header">
          <RangePicker value={[startDate, endDate]} disabled />
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <EventList events={events}></EventList>
        </Col>
      </Row>
    </main>
  );
};

export default App;
