import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";

const CalendarBtn = ({ addEvent }) => {
  return (
    <button className="float-btn" onClick={addEvent}>
      <AiOutlineCalendar className="logo" />
    </button>
  );
};

export default CalendarBtn;
