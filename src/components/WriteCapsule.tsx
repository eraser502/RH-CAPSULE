import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { setMyCapsule, setReceivedCapsules } from "../services/doc.services";
import { Button } from "./Button";
import "./WriteCapsule.scss";

export const WriteCapsule = (props: { setIsWriteOpen: any }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  
  
  const handleCapsule = async() => {
    const date = new Date()
    let capsule = {title:title, content:content, writer:writer, createdAt:date}
    
    if(true){
      setMyCapsule(capsule);
    }
    else{
      setReceivedCapsules(capsule)
    }
  }

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
        <input onChange={(e:any)=>setTitle(e.target.value)} value={title} placeholder="To."/>
      </div>
      <div className="WCContent">
        <textarea onChange={(e:any)=>setContent(e.target.value)} value={content}placeholder="내용을 입력하세요."/>
      </div>
      <div className="WCBottomBox">
        <input  onChange={(e:any)=>setWriter(e.target.value)} value={writer} placeholder="From."/>
      </div>
      <Button
        bottom="20px"
        name="타임캡슐 만들기"
        btnClick={() => {
          props.setIsWriteOpen(false);
          handleCapsule();
        }}
      />
    </div>
  );
};
