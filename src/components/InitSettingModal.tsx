import React, { useState } from "react";
import { Carousel } from "./Carousel";
import "./InitSettingModal.scss";
import { BiArrowBack } from "react-icons/bi";
import { GlassButton } from "./GlassButton";
export const InitSettingModal = (props: {
  glassSettingList: any;
  bgClick: any;
  glassColorSetting: any;
  glassOpenDateSetting: any;
  makeGlassDB:any
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [dateSelector, setDateSelector] = useState([
    { name: "6개월 뒤", checked: false, date: "2023. 9. 1." },
    { name: "1년 뒤", checked: false, date: "2024. 1. 1." },
    { name: "5년 뒤", checked: false, date: "2028. 1. 1." },
    { name: "10년 뒤", checked: false, date: "2033. 1. 1." },
  ]);

  const [checkIndex, setCheckIndex] = useState(-1);

  const checkOnlyOne = (name: string) => {
    const index = dateSelector.findIndex((value: any) => value.name === name);
    let tmp = [...dateSelector];
    for (let i = 0; i < dateSelector.length; i++) {
      tmp[i].checked = false;
    }
    setCheckIndex(index);
    tmp[index].checked = true;
    setDateSelector(tmp);
  };

  const selectDate = () => {
    if (checkIndex === -1) {
      alert("개봉일자를 체크해주세요"); //토스트로 바꾸기
      return;
    }
    setPageIndex(2);
    props.glassOpenDateSetting(dateSelector[checkIndex].date);
  };

  return (
    <div className="glassModalContainer">
      <div className="glassModalBG"></div>
      <div className="glassModalSettingBox">
        {pageIndex === 0 ? (
          <>
            <BiArrowBack
              className="backButton"
              onClick={() => props.bgClick(false)}
            />
            <Carousel
              setColor={(color: string) => {
                props.glassColorSetting(color);
                setPageIndex(1);
              }}
            />
          </>
        ) : pageIndex === 1 ? (
          <div className="glassDateSettingContainer">
            <BiArrowBack
              className="backButton"
              onClick={() => setPageIndex(0)}
            />
            <div className="glassDateHeader">캡슐함 개봉일자 설정</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                className="glass"
                src={`/assets/glass_${props.glassSettingList.glassColor}.png`}
              />

              <div
                style={{
                  display: "flex",
                  height: "20px",
                  fontSize: "16px",
                  gap: "4px",
                }}
              >
                {dateSelector.map((value: any) => (
                  <div key={value.name} style={{ display: "flex",alignItems:"center" }}>
                    <input
                      name={value.name}
                      type="checkbox"
                      checked={value.checked}
                      onChange={() => checkOnlyOne(value.name)}
                    />
                    <div style={{ color: value.checked ? "black" : "gray" }}>
                      {value.name}
                    </div>
                  </div>
                ))}
              </div>
              <GlassButton
                name="날짜 결정하기"
                buttonColor={"#" + props.glassSettingList.glassColor}
                onClick={() => {
                  selectDate();
                }}
              />
            </div>

            <div className="sealDate">봉인 일자<br />[2023. 2. 28.]</div>

          </div>
        ) : pageIndex === 2 ? (
          <div className="glassDateSettingContainer">
            <BiArrowBack
              className="backButton"
              onClick={() => setPageIndex(1)}
            />
            <div className="glassDateHeader">캡슐함 개봉일자 설정</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "52px",
              }}
            >
              <img
                className="glass"
                src={`/assets/glass_${props.glassSettingList.glassColor}.png`}
              />
              <GlassButton
                name="캡슐함 생성하기"
                buttonColor={"#" + props.glassSettingList.glassColor}
                onClick={() => {
                  if(!window.confirm("생성하시겠습니까?")){
                    return
                  }
                  props.makeGlassDB();
                }}
              />
            </div>
            <div className="cork" />
            <div className="tape" />
            <div className="sealDate">봉인 일자<br />[2023. 2. 28.]</div>
            <div className="openDate">개봉 일자<br />[{props.glassSettingList.openDate}]</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
