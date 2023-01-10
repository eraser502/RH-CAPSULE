import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
import "./GuestMain.scss";

type pageParams = { userId: string }

export const GuestMain: React.FC  = () => {

  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const { userId: userId } = useParams<pageParams>();
  const navigate = useNavigate();


  return (
    <div className="mainContainer">
      {isWriteOpen ? (
        <WriteCapsule setIsWriteOpen={(e: boolean) => setIsWriteOpen(e)} />
      ) : (
        <>
          <div className="mainContentBox">
            <div className="mainReceivedCapsuleText">
              {userId}님이 받은 캡슐들
            </div>
            <div className="mainReceivedCapsule">
              {[1, 1, 1, 1, 1].map(() => (
                <Capsule width="40px" />
              ))}
            </div>
          </div>
          <Button
            bottom="80px"
            name="박도륜님에게 타임캡슐 쓰기"
            btnClick={() => setIsWriteOpen(!isWriteOpen)}
          ></Button>
          <Button
            bottom="20px"
            name="나의 타임캡슐 만들러가기"
            btnClick={() => navigate("/signUp")}
          ></Button>
          {/* Navigate로 수정해야함 */}
        </>
      )}
    </div>
  );
};
