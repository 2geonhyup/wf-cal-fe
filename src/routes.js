import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./main/App";
import Calendar from "./eachCalendar/CalendarPage";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar/:calendarId" element={<Calendar />} />
        {/* <Route
          path="/login"
          component={() => {
            window.location.href = "http://localhost:3005/auth/googlelogin";
            return null;
          }}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
