import React, { useEffect, useState } from "react";
import "./Main.scss";
import "../theme/variable.css";
import { Button } from "../components/Button";
import { TbSettings } from "react-icons/tb";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal";
import { GrInfo } from "react-icons/gr";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { auth } from "../firebase";
import { Glass } from "../components/Glass";
import { getData, getGlassSetting } from "../services/doc.services";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const Main = () => {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");

  let user = auth.currentUser;

  const onClickToastPopup = (name: string) => {
    if (name === "Email") {
      ToastsStore.success("이메일이 복사되었습니다.");
    } else {
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
    for (let i = 0; i < data.glassSetting.capsuleColorDB.length; i++) {
      capsules.push(
        <Capsule color={data.glassSetting.capsuleColorDB[i]} width="40px" />
      );
      if (i == 14) {
        break;
      }
    }
  }
  const urlLink: string =
    "https://rh-capsule.firebaseapp.com/capsule/" + auth.currentUser.uid;

  const onClickWriteButton = () => {
    const isWrite = getData(auth.currentUser.uid);
    if (isWrite) {
      alert(`이미 타입캡슐을 작성하셨습니다.`);
      return;
    }
    setIsWriteOpen(!isWriteOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mainContainer">
      {isWriteOpen ? (
        <WriteCapsule
          color={data.glassSetting.glassColor}
          capsuleColorDB={data.glassSetting.capsuleColorDB}
          isMe={true}
          setIsWriteOpen={(e: boolean) => setIsWriteOpen(e)}
          userId={auth.currentUser.uid}
          reLoadCapsule={() => {
            fetchData();
          }}
        />
      ) : (
        <>
          <div className="mainContentBox">
            <div className="mainHeader">
              <GrInfo
                onClick={() => {
                  setIsModalOpen(true);
                  setModalName("info");
                }}
              />
              <TbSettings
                onClick={() => {
                  setModalName("setting");
                  setIsModalOpen(!isModalOpen);
                }}
              />
            </div>
            {isModalOpen ? (
              <Modal
                color="fff"
                name={modalName}
                onClickToastPopup={() => onClickToastPopup("Email")}
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
              <div className="sealDate">
                봉인 일자
                <br />
                [2023. 1. 31.]
              </div>
              <div className="openDate">
                개봉 일자
                <br />[{data.glassSetting.openDate}]
              </div>
              <Button
                btColor={data.glassSetting.glassColor}
                bottom="84px"
                name="나에게 타임캡슐 쓰기"
                btnClick={() => onClickWriteButton()}
              ></Button>
              <CopyToClipboard
                text={urlLink}
                onCopy={() => onClickToastPopup("")}
              >
                {/* <Button
                  btColor={data.glassSetting.glassColor}
                  bottom="20px"
                  name="링크 복사"
                  btnClick={undefined}
                ></Button> */}
                <div
                  className="copyLinkButton"
                  style={{
                    backgroundColor: "#" + data.glassSetting.glassColor,
                  }}
                >
                  링크 복사
                </div>
              </CopyToClipboard>
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
