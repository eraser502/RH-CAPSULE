import React from 'react'
import "./Button.scss"
import "../theme/variable.css"

export const Button = (props:{name:string, btnClick:any}) => {
  return (
    <button className="RCButton" onClick={()=>props.btnClick()}>{props.name}</button>
  )
}
