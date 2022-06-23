import CalendarItem from "./CalendarItem";

const CalendarList = ({ calendarList, searchTerm }) => {
  return (
    <div className="calendar-list">
      {calendarList
        .filter((val) => {
          if (searchTerm === "") {
            return true;
          } else if (
            val.calName.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
        .map((it) => (
          <CalendarItem key={it.id} {...it} />
        ))}
    </div>
  );
};

export default CalendarList;
