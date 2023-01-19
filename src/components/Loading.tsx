import React from 'react'
import "./Loading.scss"

export const Loading = (props: any) => {
  return (
    <div className="loadingContainer">
      <div className="lds-spinner">
        <span className="loadingText">{props.children}</span>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    // <div className="loadingContainer">
    //   <div className="loading2">
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    //   <span className="loadingText">{props.children}</span>
    // </div>
  )
}
