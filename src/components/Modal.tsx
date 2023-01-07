import React from 'react'
import "./Modal.scss"
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
export const Modal = (props:{bgClick:any,onClickToastPopup:any}) => {

    const urlLink:string = "http://drxxn.club"

    const linkCopy = async () => {
        try{
            navigator.clipboard.writeText(urlLink).then(()=>{
                props.onClickToastPopup()
                props.bgClick(false)
            });
        }
        catch(err:any){
            console.log(err)
            alert("링크 복사 실패")
        }
    }

  return (
    <div className="modalContainer">
        <div className="modalBG" onClick={()=>props.bgClick(false)}></div>
        <div className="modalContentBox">
            <span>링크 복사</span>
            <div className="modalContentLink" onClick={()=>{linkCopy()}}>{urlLink}</div>
        </div>
        
    </div>
  )
}
