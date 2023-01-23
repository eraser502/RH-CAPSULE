import React, { useCallback, useEffect, useRef, useState } from "react";
import { Capsule } from "./Capsule";
import "./ColorSetModal.scss";
import { ChromePicker } from "react-color";
import { BiArrowBack } from "react-icons/bi";
import { GlassButton } from "./GlassButton";
export const ColorSetModal = (props: {
  setIsModalOpen: any;
  handleCapsule: any;
  color: any;
}) => {
  const [color, setColor] = useState("#BC2749");
  const [isColorCustom, setIsColorCustom] = useState(false);
  const handleColorChange = useCallback(
    // 온체인지 이벤트를 담당할 함수다.
    (color: string) => {
      // 바뀌는 컬러값을 매개변수로 받아서
      setColor(color); // setColor 안에 넣어줘서 color 를 변경해줄거다.
    },
    [color]
  ); // 단 컬러 데이터가 바뀔때마다 이 함수는 갱신된다.

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        setIsColorCustom(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <div className="colorModalContainer">
      <>
        <div className="colorModalBG"></div>
        <div className="colorModalContentBox">
          <div className="backButton">
            <BiArrowBack onClick={() => props.setIsModalOpen(false)} />
          </div>
          <div className="capsuleSelectText">캡슐 색상을 골라주세요</div>
          <Capsule width="92px" color={color} />
          <div className="colorPalette">
            <div
              className="colorSetIcon"
              onClick={() => setColor("#BC2749")}
              style={{ backgroundColor: "#BC2749" }}
            ></div>
            <div
              className="colorSetIcon"
              onClick={() => setColor("#AF90EF")}
              style={{ backgroundColor: "#AF90EF" }}
            ></div>
            <div
              className="colorSetIcon"
              onClick={() => setColor("#FFE278")}
              style={{ backgroundColor: "#FFE278" }}
            ></div>
            <img
              className="colorSetIcon"
              onClick={() => setIsColorCustom(true)}
              src="/assets/chromatic.png"
            />
          </div>
          <GlassButton
            name="타임캡슐 생성"
            buttonColor={"#" + props.color}
            onClick={() => {
              props.handleCapsule(color);
            }}
          />

          {isColorCustom ? (
            <div className="colorPicker" ref={modalRef}>
              <ChromePicker
                color={color}
                onChange={(color) => handleColorChange(color.hex)}
              />
            </div>
          ) : null}
        </div>
      </>
    </div>
  );
};
