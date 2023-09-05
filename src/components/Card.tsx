import React, { ReactNode } from "react";
import "./Card.scss";

interface CardPropsType {
  children: ReactNode;
  writer: string;
  color: string;
}

export const Card: React.FC<CardPropsType> = ({ children, writer, color }) => {
  const hexToRGBA = (hex: any, alpha: any) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    // <div className='cardBox' style={{backgroundColor : color}}>
    //     {children}
    //     <p>{writer}</p>
    // </div>
    <div className="cardBox" style={{ backgroundColor: hexToRGBA(color, 0.6) }}>
      {children}
      <p>
        {writer.length > 5 ? `${writer.slice(0, 4)}..` : writer} 님의 캡슐
      </p>
    </div>
  );
};
