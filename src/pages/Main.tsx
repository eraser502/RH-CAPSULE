import React, { useEffect, useState } from "react";
import "./Main.scss";
import "../theme/variable.css";
import { Button } from "../components/Button";
import { TbSettings } from "react-icons/tb";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal";
import { GrInfo } from "react-icons/gr"
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
  const [modalName, setModalName] = useState("")

  let user = auth.currentUser;

  const onClickToastPopup = (name:string) => {
    if(name === "Email"){
      ToastsStore.success("이메일이 복사되었습니다.");
    }else{
      ToastsStore.success("링크가 복사되었습니다.");
    }
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      (async () => {
        const response: any = await getGlassSetting();

        if (response === undefined) {
          setLoading(false);
          return;
        }
        setData(response);
        setLoading(false);
      })();
    } catch (e: any) {
      setLoading(false);
    }
  };
  let capsules = [];
  if (data) {
    for (let i = 0; i < data.capsuleDB.length; i++) {
      capsules.push(
        <Capsule color={data.capsuleDB[i].capsuleColor} width="40px" />
      );
      if (i == 14) {
        break;
      }
    }
  }
  const urlLink: string =
    "https://rh-capsule.firebaseapp.com/capsule/" + auth.currentUser.uid;

  const linkCopy = async () => {
    try {
      navigator.clipboard.writeText(urlLink).then(() => {
        onClickToastPopup("");
      });
    } catch (err: any) {
      // console.log(err);
      alert("링크 복사 실패");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="mainContainer">
      {isWriteOpen ? (
        <WriteCapsule
          color={data.glassSetting.glassColor}
          capsuleDB={data.capsuleDB}
          isMe={true}
          setIsWriteOpen={(e: boolean) => setIsWriteOpen(e)}
          reLoadCapsule={() => {
            fetchData();
          }}
        />
      ) : (
        <>
          <div className="mainContentBox">
            <div className="mainHeader">
              <GrInfo onClick={()=>{setIsModalOpen(true);setModalName("info")}} />
              <TbSettings onClick={() => {setModalName("setting");setIsModalOpen(!isModalOpen)}} />
            </div>
            {isModalOpen ? (
              <Modal
                color="fff"
                name={modalName}
                onClickToastPopup = {()=>onClickToastPopup("Email")}
                bgClick={(e: boolean) => setIsModalOpen(e)}
              />
            ) : null}
            <div className="mainMyCapsuleText">
              {user.displayName}님의 캡슐함
            </div>
            {/* <div className="mainMyCapsule">
              <Capsule width="60px" />
            </div> */}
            {/* <div className="mainReceivedCapsuleText">
            {user.displayName}님이 받은 캡슐들
            </div> */}
            <div className="mainReceivedCapsule">
              {/* {[1, 1, 1, 1, 1,1,1,1,1,1,1,1,1,1,1].map(() => (
                <Capsule width="40px" />
              ))} */}
              {capsules}
            </div>
          </div>
          {loading ? (
            <Loading></Loading>
          ) : data === null ? (
            <Glass
              fetchData={() => {
                fetchData();
              }}
            />
          ) : (
            <>
              <img
                className="glassCapsule"
                src={`/assets/glassOpen_${data.glassSetting.glassColor}.png`}
              />
              <Button
                btColor={data.glassSetting.glassColor}
                bottom="84px"
                name="나에게 타임캡슐 쓰기"
                btnClick={() => setIsWriteOpen(!isWriteOpen)}
              ></Button>
              <Button
                btColor={data.glassSetting.glassColor}
                bottom="20px"
                name="링크 복사"
                btnClick={() => linkCopy()}
              ></Button>
            </>
          )}
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
