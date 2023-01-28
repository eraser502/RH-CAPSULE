import React, { useState } from "react";
import "./Glass.scss";
import { Modal } from "./Modal";
import { InitSettingModal } from "./InitSettingModal";
import { setGlassSetting, setCapsuleDB } from "../services/doc.services";

export const Glass = (props: { fetchData: any }) => {
  let glassSettingList = {
    capsuleColorDB:[],
    glassColor: "",
    openDate: "",
    sealDate: "2023. 2. 28.",
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const makeGlassDB = () => {
    setGlassSetting(glassSettingList).then(() => {
      setModalIsOpen(false);
      props.fetchData();
    });
    setCapsuleDB();
  };
  return (
    <div className="glassContainer">
      <img
        className="glassCapsule"
        onClick={() => setModalIsOpen(true)}
        src="/assets/glass_normal.png"
      />

      {modalIsOpen ? (
        <InitSettingModal
          glassSettingList={glassSettingList}
          bgClick={(e: any) => setModalIsOpen(e)}
          glassColorSetting={(color: string) => {
            glassSettingList.glassColor = color;
          }}
          glassOpenDateSetting={(date: string) => {
            glassSettingList.openDate = date;
          }}
          makeGlassDB={() => {
            makeGlassDB();
          }}
        />
      ) : null}
    </div>
  );
};
