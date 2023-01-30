import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
import { Loading } from "../components/Loading";
import { getData, getGuestData } from "../services/doc.services";
import "./GuestMain.scss";

type pageParams = { userId: string };

export const GuestMain: React.FC = () => {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const { userId: userId } = useParams<pageParams>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({ name: "", capsuleColorDB: [] });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getGuestData(userId);
      setData(response);
      setLoading(false);
    } catch (e: any) {
      console.log(e.message);
      if (
        e.message.includes("undefined")
        // "Cannot read properties of undefined (reading 'userName')"
      ) {
        alert("잘못된 링크입니다.")
        navigate("/main");
 
      }
      // navigate
      setLoading(false);
    }
  };

  const onClickWriteButton = () => {
    if (userId === undefined) {
      return;
    }
    const isWrite = getData(userId);
    if (isWrite) {
      alert(`이미 ${data.name}님에게 타입캡슐을 작성하셨습니다.`);
      return;
    }
    setIsWriteOpen(!isWriteOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  let capsules = [];
  if (data) {
    for (let i = 0; i < data.capsuleColorDB.length; i++) {
      capsules.push(<Capsule color={data.capsuleColorDB[i]} width="40px" key={i} />);
      if (i == 14) {
        break;
      }
    }
  }
  return (
    <div className="mainContainer">
      {loading ? (
        <Loading></Loading>
      ) : isWriteOpen ? (
        <WriteCapsule
          userId={userId}
          color={data.color}
          capsuleColorDB={data.capsuleColorDB}
          isMe={false}
          setIsWriteOpen={(e: boolean) => setIsWriteOpen(e)}
          reLoadCapsule={() => fetchData()}
        />
      ) : (
        <>
          <img
            className="glassCapsule"
            src={`/assets/glassOpen_${data.color}.png`}
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
            <br />[{data.openDate}]
          </div>
          <div className="mainContentBox">
            <div className="mainReceivedCapsuleText">
              {data.name}님이
              <br /> 받은 캡슐들
            </div>
            <div className="mainReceivedCapsule">
              {/* {data.capsuleDB.map(() => (
                <Capsule width="40px" />
              ))} */}
              {capsules}
            </div>
          </div>

          <Button
            btColor={data.color}
            bottom="84px"
            name={`${data.name}님에게 타임캡슐 쓰기`}
            btnClick={() => {
              onClickWriteButton();
            }}
          ></Button>
          <Button
            btColor={data.color}
            bottom="20px"
            name="나의 타임캡슐 만들러 가기"
            btnClick={() => navigate("/signUp")}
          ></Button>
          {/* Navigate로 수정해야함 */}
        </>
      )}
    </div>
  );
};
