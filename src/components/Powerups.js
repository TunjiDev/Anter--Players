import { useState, useContext } from "react";
import { ImHeart, ImHearBroken } from "react-icons/im";
import { TiCancel } from "react-icons/ti";
import eraser from "../img/eraser.svg";
import fail from "../img/fail.png";
import { HiOutlineEmojiSad } from "react-icons/hi";

import "./style2.css";

const Powerups = ({ lives, handleHide, hideOption }) => {
  const useEraser = () => {
    !hideOption && handleHide();
  };
  return (
    <div className="powerups__container">
      <div className="powerups__lives">
        <div className="powerups__icon">
          <ImHeart className={`powerups__heart ${lives >= 1 && "red"}`} />
          <ImHeart className={`powerups__heart ${lives >= 2 && "red"}`} />
          <ImHeart className={`powerups__heart ${lives >= 3 && "red"}`} />
        </div>
      </div>
      <div className="powerups__eraserDiv" onClick={useEraser}>
        <div className={`powerups__icon `}>
          <img src={eraser} alt="eraser" className={`powerups__eraser `} />
        </div>
        <p>Eraser</p>
      </div>
    </div>
  );
};

export default Powerups;

export const LostLife = ({ close, lives, action }) => {
  const [usedLife, setUsedLife] = useState("");
  return (
    <>
      <div className="overlay"></div>

      <div className="life__modal">
        <p style={{ marginBottom: "20px", fontSize: "15px" }}>
          Failed! Don't give up yet!
        </p>
        <button onClick={action} className="btn shortbtn">
          Use 1
          <ImHeart style={{ background: "#1c0234aa", color: "red" }} />
        </button>
        <button className="btn shortbtn spacing" onClick={close}>
          I give up!
        </button>
      </div>
    </>
  );
};
