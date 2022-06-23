import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CalendarItem = ({ id, calName, subscribers }) => {
  let navigate = useNavigate();
  function handleClick() {
    navigate(`/calendar/${id}`);
  }

  return (
    <button className="calendar-item" onClick={handleClick}>
      <div className="item-title">{calName}</div>
      <div className="follow-count-box">
        <FaUserAlt className="user-logo" />
        <div className="follow-count">
          {subscribers === null ? 0 : subscribers.length}
        </div>
      </div>
    </button>
  );
};

export default CalendarItem;
