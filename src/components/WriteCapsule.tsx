import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { updateCapsuleDB } from "../services/doc.services";
import { Button } from "./Button";
import "./WriteCapsule.scss";
import { auth } from "../firebase";
import { ColorSetModal } from "./ColorSetModal";

export const WriteCapsule = (props: {
  userId?: any;
  color?: any;
  capsuleDB: any;
  isMe?: boolean;
  setIsWriteOpen: any;
  reLoadCapsule?: any;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCapsule = async (color:any) => {
    setLoading(true);
    const date = new Date();
    let capsule = {
      title: title,
      content: content,
      writer: writer,
      createdAt: date,
      isMe: props.isMe,
      capsuleColor:color
    };
    let tmp = [...props.capsuleDB, capsule];
   
    if (!props.isMe) {
      updateCapsuleDB(tmp, props.userId).then(() => {
        setLoading(false);
        props.setIsWriteOpen(false);
        props.reLoadCapsule();
      });
    } else {
      updateCapsuleDB(tmp, auth.currentUser.uid).then(() => {
        setLoading(false);
        props.setIsWriteOpen(false);
        props.reLoadCapsule();
      });
    }
  };

  return (
    <div className="WCContainer">
      <div className="WCHeader">
        <BiArrowBack
          onClick={() => {
            props.setIsWriteOpen(false);
          }}
        />
      </div>
      <div className="WCTopBox">
        <input
          onChange={(e: any) => setTitle(e.target.value)}
          value={title}
          placeholder="To."
        />
      </div>
      <div className="WCContent">
        <textarea
          onChange={(e: any) => setContent(e.target.value)}
          value={content}
          placeholder="내용을 입력하세요."
        />
      </div>
      <div className="WCBottomBox">
        <input
          onChange={(e: any) => setWriter(e.target.value)}
          value={writer}
          placeholder="From."
        />
      </div>
      <Button
        btColor={props.color}
        bottom="20px"
        name={loading ? "보내는 중..." : "타임캡슐 만들기"}
        btnClick={() => {
          // handleCapsule();
          if(title && writer && content){
            setIsModalOpen(true);
          }else{
            alert("내용을 입력해주세요.")
          }
        }}
      />
      {isModalOpen ? (
        <ColorSetModal
          color={props.color}
          setIsModalOpen={() => {
            setIsModalOpen(false);
          }}
          handleCapsule={(e:any)=>handleCapsule(e)}
        />
      ) : null}
    </div>
  );
};
