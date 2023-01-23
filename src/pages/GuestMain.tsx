import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Capsule } from "../components/Capsule";
import { WriteCapsule } from "../components/WriteCapsule";
import { Loading } from "../components/Loading";
import { getGuestData, updateCapsuleDB } from "../services/doc.services";
import "./GuestMain.scss";

type pageParams = { userId: string };

export const GuestMain: React.FC = () => {
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const { userId: userId } = useParams<pageParams>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({ name: "", capsuleDB: [] });
  const [capsuleDB, setCapsuleDB] = useState("");
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getGuestData(userId);
      setData(response);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  return (
    <div className="mainContainer">
      {loading ? (
        <Loading></Loading>
      ) : isWriteOpen ? (
        <WriteCapsule
          userId={userId}
          color={data.color}
          capsuleDB={data.capsuleDB}
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
          <div className="mainContentBox">
            <div className="mainReceivedCapsuleText">
              {data.name}님이<br/> 받은 캡슐들
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
              setIsWriteOpen(!isWriteOpen);
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
