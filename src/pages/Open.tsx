import React, { useEffect, useState } from "react";
import "./Main.scss";
import "./Open.scss";
import "../theme/variable.css";
import { Button } from "../components/Button";
import { TbSettings } from "react-icons/tb";
import { OpenableCapsule } from "../components/Capsule";
import { ReadCapsule } from "../components/ReadCapsule";
import { Loading } from "../components/Loading";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import { GrInfo } from "react-icons/gr";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { auth } from "../firebase";
import { Glass } from "../components/Glass";
import { getData, getGlassSetting } from "../services/doc.services";
import { useNavigate } from "react-router-dom";
import { Block } from "./Block";

export const Open = () => {
  const [isCapsuleOpen, setIsCapsuleOpen] = useState(false);
  // 현재 클릭한 캡슐 데이터
  const [currendClickedData, setCurrentClickedData] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");

  const [isBlocked, setIsBlocked] = useState(false);

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
  
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      (async () => {
        const response: any = await getGlassSetting();
        console.log(response);
        
        if(new Date(response.glassSetting.openDate) > new Date()){
          setIsBlocked(true);
        }
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

  const capsules: any = [];

  if (data) {
    Object.values(data.capsuleDB).map((obj: any, i: number) => {
      if (obj !== "Capsules") {
        capsules.push(
          <Card writer={obj.writer} color={obj.capsuleColor} key={i}>
            <OpenableCapsule
              data={obj}
              width="40px"
              onClick={(e: any) => {
                setIsCapsuleOpen(true);
                setCurrentClickedData(e);
              }}
            />
          </Card>
        );
      }
    });
  }
  const urlLink: string =
    "https://rh-capsule.firebaseapp.com/capsule/" + auth.currentUser.uid;

  const onClickWriteButton = () => {
    const isWrite = getData(auth.currentUser.uid);
    if (isWrite) {
      alert(`이미 타입캡슐을 작성하셨습니다.`);
      return;
    }
    setIsCapsuleOpen(!isCapsuleOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);


  if(isBlocked){
    return(
      <Block />
    )
  }
  
  return (
    <div className="mainContainer">
      {isCapsuleOpen ? (
        <ReadCapsule
          color={data.glassSetting.glassColor}
          setIsWriteOpen={(e: boolean) => setIsCapsuleOpen(e)}
          reLoadCapsule={() => {
            fetchData();
          }}
          data={currendClickedData}
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
            <div className="mainMyCapsuleText">
              {user.displayName}님의 캡슐함
            </div>
            <div className="openReceivedCapsule">{capsules}</div>
          </div>
          {isModalOpen ? (
            <Modal
              color="fff"
              name={modalName}
              onClickToastPopup={() => onClickToastPopup("Email")}
              bgClick={(e: boolean) => setIsModalOpen(e)}
            />
          ) : null}
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
              {/* <img
                className="glassCapsule"
                src={`/assets/glassOpen_${data.glassSetting.glassColor}.png`}
              />
              <div className="receivedCapsuleNum">
                받은 캡슐 {data.capsuleColorDB.length}개
              </div>
              <div className="sealDate">
                봉인 일자
                <br />
                [2023. 2. 28.]
              </div>
              <div className="openDate">
                개봉 일자
                <br />[{data.glassSetting.openDate}]
              </div> */}
              {/* <Button
                btColor={data.glassSetting.glassColor}
                bottom="84px"
                name="캡슐함 열기"
                btnClick={() => {alert("열었음")}}
              ></Button> */}
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
