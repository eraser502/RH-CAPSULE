import React, { useState } from "react";
import "./Glass.scss";
import { Modal } from "./Modal";
import { InitSettingModal } from "./InitSettingModal";
import { setGlassSetting } from '../services/doc.services';

export const Glass = () => {
  
  let glassSettingList = { glassColor: "", openDate: "", sealDate:"2023. 1. 31." };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const makeGlassDB=()=>{
    setGlassSetting(glassSettingList).then();
    setModalIsOpen(false)
    //navigate 넣어야해
  }
  return (
    <div className="glassContainer">
      <img className="glassCapsule" src="/assets/capsuleGlass_normal.png" />
      <img
        className="plusButton"
        onClick={() => setModalIsOpen(true)}
        src="/assets/Plusicon.png"
      />
      {/* <div className="plusButton">
            <div className="plusButtonLine1" />
            <div className="plusButtonLine2" />
        </div> */}
      {modalIsOpen ? (
        <InitSettingModal
          glassSettingList={glassSettingList}
          bgClick={(e: any) => setModalIsOpen(e)}
          glassColorSetting={(color:string) => {glassSettingList.glassColor=color}}
          glassOpenDateSetting={(date:string) => {glassSettingList.openDate=date}}
          makeGlassDB={()=>{makeGlassDB()}}
        />
      ) : null}
    </div>
  );
};
