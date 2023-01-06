import React, { useState } from "react";
import "./Main.scss";
import "../theme/variable.css";
import { Button } from "../components/Button";
import { TbSettings } from "react-icons/tb";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
export const Main = () => {
  const [a, setA] = useState(1);
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const sex = () => {
    console.log("ㅎㅇ");
  };

  return (
    <div className="mainContainer">
      {isWriteOpen ? (
        <WriteCapsule setIsWriteOpen={(e:boolean)=>setIsWriteOpen(e)} />
      ) : (
        <>
          <div className="mainContentBox">
            <div className="mainHeader">
              <TbSettings />
            </div>
            <div className="mainMyCapsuleText">박도륜님의 캡슐</div>
            <div className="mainMyCapsule">
              <Capsule width="60px" />
            </div>
            <div className="mainReceivedCapsuleText">
              박도륜님이 받은 캡슐들
            </div>
            <div className="mainReceivedCapsule">
              {[1, 1, 1, 1, 1].map(() => (
                <Capsule width="40px" />
              ))}
            </div>
          </div>
          <Button
            name="나에게 타임캡슐 쓰기"
            btnClick={() => setIsWriteOpen(!isWriteOpen)}
          ></Button>
        </>
      )}
    </div>
  );
};
