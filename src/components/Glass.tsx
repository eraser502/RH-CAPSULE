import React, { useState } from 'react'
import "./Glass.scss"
import { Modal } from './Modal';

export const Glass = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="glassContainer">
        <img className='glassCapsule' src="/assets/capsuleGlass_normal.png" />
        <img className='plusButton' onClick={()=>setModalIsOpen(true)} src="/assets/Plusicon.png" />
        {/* <div className="plusButton">
            <div className="plusButtonLine1" />
            <div className="plusButtonLine2" />
        </div> */}
        {modalIsOpen ? <Modal name="glassSetting" bgClick={(e:any)=>setModalIsOpen(e)} onClickToastPopup={undefined} />:null}
    </div>
  )
}