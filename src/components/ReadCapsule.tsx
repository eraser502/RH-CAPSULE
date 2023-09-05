import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { setData, updateCapsuleDB } from "../services/doc.services";
import { Button } from "./Button";
import "./WriteCapsule.scss";
import { auth } from "../firebase";
import { ColorSetModal } from "./ColorSetModal";

interface ReadCapsulePropsType {
  userId?: any;
  color?: any;
  isMe?: boolean;
  setIsWriteOpen: any;
  reLoadCapsule?: any;
  data?: any
}

export const ReadCapsule:React.FC<ReadCapsulePropsType> = ({
  color,
  setIsWriteOpen,
  reLoadCapsule,
  data
}) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="WCContainer">
      <div className="WCHeader">
        <BiArrowBack
          onClick={() => {
            setIsWriteOpen(false);
          }}
        />
      </div>
      <div className="WCTopBox">
        {data.title}
      </div>
      <div className="WCContent">
        {data.content}
      </div>
      <div className="WCBottomBox">
        {data.writer}
      </div>
    </div>
  );
};
