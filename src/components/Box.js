import { useState } from "react";
import "./Box.css";
export default function Box({ children, className = "", width = "400px" }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`box ${className}`} style={{ width }}>
      <i
        className={`fa-solid ${isOpen ? "fa-minus" : "fa-plus"} showbox-btn`}
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      ></i>
      {isOpen && children}
    </div>
  );
}
