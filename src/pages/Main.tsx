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

  let user = auth.currentUser;

  const onClickToastPopup = () => {
    ToastsStore.success("링크가 복사되었습니다.");
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null)

  const fetchData = async () => {
    setLoading(true);
    try {
      (async () => {
        const response: any = await getGlassSetting()
        if (response === undefined) { setLoading(false);return; }
        setData(response);
        setLoading(false);
      })();
    } catch (e: any) {
      console.log(e);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);


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
              <Modal name="setting" bgClick={(e: boolean) => setIsModalOpen(e)} />
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
          {loading ? (
            <div style={{ position:"absolute", left:"0", top:"0",fontSize:"52px", width: "100vh",height:"100vh", background: "white", color: "red" }}>Loading...</div>
          ) : data === null ? (
            <Glass fetchData={()=>{fetchData()}} />
          ) : (
            <img
              className="glassCapsule"
              src={`/assets/glass_${data.glassColor}.png`}
            />
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