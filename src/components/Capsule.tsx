import React from 'react'
import "./Capsule.scss"

export const Capsule = (props:{width:string}) => {
  return (
    <div className="capsuleContainer">
        <div className="capsuleLeft" style={{width:props.width}}></div>
        <div className="capsuleRight" style={{width:props.width}}></div>
    </div>
  )
}
