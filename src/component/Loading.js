// Loading.js
import React from "react";
import { Background, LoadingText } from "./Styles";
import Spinner from "./bean-eater.gif";

export default () => {
  return (
    <Background>
            <LoadingText>캘린더 받는 중</LoadingText>
            
      <img src={Spinner} alt="로딩중" width="5%" />
          
    </Background>
  );
};
