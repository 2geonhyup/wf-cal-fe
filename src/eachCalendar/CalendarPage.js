import React from "react";
import { useEffect, useState } from "react";
import Calendar from "./Calendar.js";
//import calendarData from "../jsonData/calendarData.json";
import LoginBtn from "../component/LoginBtn.js";
import SubscribeBtn from "./SubscribeBtn.js";
import SubscribeCancelBtn from "./SubscribeCancelBtn.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "../component/Modal.js";
import { WindowScrollController } from "@fullcalendar/core";

const setData = async (id) => {
  //TODO: get으로 calendarData 받아오기
  let response;

  // get 요청
  try {
    response = await axios.get(`http://localhost:3005/cal/${id}`, {
      withCredentials: true,
    });
  } catch {
    console.log("calendarpage get failed!");
  }
  const calendarData = response.data;
  console.log(calendarData);

  const calName = calendarData.eventList.summary;

  let userName = "";
  if ("profile" in calendarData) {
    userName = calendarData.profile.displayName;
  }
  console.log(userName);

  let subscribe = false;
  if ("subscribed" in calendarData) {
    subscribe = calendarData.subscribed;
  }

  const itemList = calendarData.eventList.items;
  //summary: 일정 이름, start: 시작 날짜, end: 끝 날짜
  return {
    calName: calName,
    userName: userName,
    subscribe: subscribe,
    itemList: itemList,
  };
};

const subscribeF = async (id) => {
  //id넣어서 보내기
  await axios.get(`http://localhost:3005/cal/${id}/subscribe`, {
    withCredentials: true,
  });
};

const unsubscribe = async (id) => {
  await axios.get(`http://localhost:3005/cal/${id}/unsubscribe`, {
    withCredentials: true,
  });
};

function CalendarPage() {
  let params = useParams();
  const [calName, setCalName] = useState("");
  const [loginState, setLoginState] = useState("");
  const [eventList, setEventList] = useState([]);
  const [subscribe, setSubscribe] = useState(false);
  useEffect(() => {
    async function ex() {
      const data = await setData(params.calendarId);
      if (data.userName === "") {
        setLoginState("로그인");
      } else {
        setLoginState(`로그아웃`);
      }
      setCalName(data.calName);
      setEventList(data.itemList);
      setSubscribe(
        data.subscribe !== "no subscribers" && data.subscribe !== false
      );
    }
    ex();
  }, [params.calendarId]);

  const [modalOpen, setModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const addEvent = async () => {
    console.log(startDate, startTime);
    await axios.post(
      `http://localhost:3005/cal/${params.calendarId}/event/create`,
      {
        summary: eventName,
        description: "",
        start: {
          dateTime: `${startDate}T${startTime}:00:00+09:00`,
        },
        end: {
          dateTime: `${startDate}T${startTime}:59:00+09:00`,
        },
      }
    );
    closeModal();
  };

  return (
    <div className="cal-page">
      <LoginBtn loginState={loginState} />
      <div className="center-col">
        <div className="cal-title">{calName}</div>
        <Calendar
          eventList={eventList}
          selectDate={(val) => {
            setStartDate(val);
          }}
        />
        {subscribe ? (
          <div className="btn-div">
            <Modal
              open={modalOpen}
              close={closeModal}
              header={startDate + " 일정 추가"}
            >
              <form>
                <input
                  placeholder="일정 이름"
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                ></input>
                <input
                  placeholder="시작 시간"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                ></input>

                <button onClick={addEvent}> 일정 추가</button>
              </form>
            </Modal>
            <button className="round-button" onClick={openModal}>
              일정 추가하기
            </button>
            <SubscribeCancelBtn
              id={params.calendarId}
              onClick={async () => {
                setSubscribe(false);
                await unsubscribe(params.calendarId);
              }}
            />
          </div>
        ) : (
          <div className="btn-div">
            <SubscribeBtn
              id={params.calendarId}
              onClick={async () => {
                if (loginState === "로그인") {
                  window.location.href =
                    "http://localhost:3005/auth/googlelogin";
                } else {
                  setSubscribe(true);
                  await subscribeF(params.calendarId);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
