import React from "react";
import "../theme/variable.css";
export const Block = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        fontSize: "28px",
        padding: "20px",
        boxSizing:"border-box"
      }}
    >
      <div style={{backgroundColor:"#eaeaea", borderRadius:"8px",textAlign:"center",padding:"8px"}}>
        타입캡슐 작성기간이 종료되었습니다 
        <br/>타입캡슐 개봉일을 기다려주세요~
      </div>
    </div>
  );
};
