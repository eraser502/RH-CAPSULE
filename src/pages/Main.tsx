import React, { useEffect, useState } from "react";
import "./Main.scss";
import "../theme/variable.css";
import { Button } from "../components/Button";
import { TbSettings } from "react-icons/tb";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
import { Modal } from "../components/Modal";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

import { auth } from "../firebase";
import { Glass } from "../components/Glass";
import { InitSettingModal } from "../components/InitSettingModal";
import { getGlassSetting } from "../services/doc.services";

export const Main = () => {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGlassDB, setIsGlassDB] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let user = auth.currentUser;

  const onClickToastPopup = () => {
    ToastsStore.success("링크가 복사되었습니다.");
  };

  let data;

  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        data = await getGlassSetting().then(() => {
          
          setIsLoading(false);
        });
      })();
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);
  
  
  if (data !== undefined){
    setIsGlassDB(true);
  }
  console.log(data);
  //zustand 써서 불러오기

  return (
    <div className="mainContainer">
      {isWriteOpen ? (
        <WriteCapsule setIsWriteOpen={(e: boolean) => setIsWriteOpen(e)} />
      ) : (
        <>
          <div className="mainContentBox">
            <div className="mainHeader">
              <TbSettings onClick={() => setIsModalOpen(!isModalOpen)} />
            </div>
            {isModalOpen ? (
              <Modal bgClick={(e: boolean) => setIsModalOpen(e)} />
            ) : null}
            <div className="mainMyCapsuleText">
              {user.displayName}님의 캡슐함
            </div>
            {/* <div className="mainMyCapsule">
              <Capsule width="60px" />
            </div>
            <div className="mainReceivedCapsuleText">
            {user.displayName}님이 받은 캡슐들
            </div>
            <div className="mainReceivedCapsule">
              {[1, 1, 1, 1, 1].map(() => (
                <Capsule width="40px" />
              ))}
            </div> */}
          </div>
          {isLoading ? (
            <div style={{ fontSize: "52px" }}>Loading...</div>
          ) : isGlassDB ? (
            <img
              className="glassCapsule"
              src="/assets/glass_${data.glassColor}.png"
            />
          ) : (
            <Glass />
          )}
          {/* <Button
            bottom="20px"
            name="나에게 타임캡슐 쓰기"
            btnClick={() => setIsWriteOpen(!isWriteOpen)}
          ></Button> */}
        </>
      )}
      <ToastsContainer
        position={ToastsContainerPosition.TOP_CENTER}
        store={ToastsStore}
        lightBackground
      />
    </div>
  );
};
