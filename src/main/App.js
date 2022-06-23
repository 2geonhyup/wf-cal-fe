import "../App.css";
// import appData from "../jsonData/appData.json";

import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import CalendarList from "./CalendarList";
import LoginBtn from "../component/LoginBtn";
import CalendarBtn from "./CalendarBtn";
import axios from "axios";
import Modal from "../component/Modal";

const setData = async () => {
  let userName = "";
  let response;

  // get 요청
  try {
    console.log("요청전줄");
    response = await axios.get("http://localhost:3005/", {
      withCredentials: true,
    });
  } catch {
    console.log("app.js get failed!");
    window.location.replace("/");
  }

  const appData = response.data;
  console.log(appData);
  const calendarList = appData.masterCal_list;
  if ("profile" in appData) {
    userName = appData.profile.displayName;
    console.log(userName);
  }

  return { userName: userName, calendarList: calendarList };
};

function App() {
  console.log("hi");

  const [searchTerm, setSearchTerm] = useState("");
  const [loginState, setLoginState] = useState("");
  const [calendarList, setCalendarList] = useState([]);

  async function ex() {
    try {
      const data = await setData();
      if (data.userName === "") {
        setLoginState("로그인");
      } else {
        setLoginState(`로그아웃`);
      }
      setCalendarList(data.calendarList);
    } catch {
      console.log("app.js erre");
    }
  }

  useEffect(() => {
    ex();
  }, []);

  console.log(loginState);

  const [modalOpen, setModalOpen] = useState(false);
  const [calName, setCalName] = useState("");
  const [hashTags, setHashTags] = useState([]);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const addCal = async () => {
    console.log(hashTags);
    await axios.post("http://localhost:3005/cal/create", {
      summary: calName,
      hashtags: hashTags,
    });
    closeModal();
  };

  return (
    <div className="App">
      <LoginBtn loginState={loginState} />
      <Modal open={modalOpen} close={closeModal} header="캘린더 추가">
        {/* Modal.js <main> {props.children} </main>에 내용이 입력된다. 리액트 함수형 모달 */}
        <form>
          <div>
            <input
              placeholder="캘린더 이름"
              onChange={(e) => {
                setCalName(e.target.value);
              }}
            ></input>
          </div>

          <input
            placeholder="태그1"
            onChange={(e) => {
              setHashTags([...hashTags, e.target.value]);
            }}
          ></input>
          <input
            placeholder="태그2"
            onChange={(e) => {
              setHashTags([...hashTags, e.target.value]);
            }}
          ></input>
          <input
            placeholder="태그3"
            onChange={(e) => {
              setHashTags([...hashTags, e.target.value]);
            }}
          ></input>
          <button onClick={addCal}>추가하기</button>
        </form>
      </Modal>
      <CalendarBtn addEvent={openModal} />
      <div className="title">
        <div className="sub-title">calendar</div>
        <div className="main-title">waffle</div>
      </div>

      <div className="search-bar">
        <input
          type="search"
          placeholder="추가할 일정 찾아보기"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <AiOutlineSearch className="logo" />
      </div>
      <CalendarList
        calendarList={calendarList}
        searchTerm={searchTerm}
      ></CalendarList>
    </div>
  );
}

export default App;
