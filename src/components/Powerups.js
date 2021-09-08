import React from "react";
import { ImHeart } from "react-icons/im";
import { BiEraser } from "react-icons/bi";
import { HiOutlineEmojiSad } from "react-icons/hi";

import "./style2.css";

const Powerups = ({ lives }) => {
  return (
    <div className="powerups__container">
      <div className="powerups__each">
        <div className="powerups__icon">
          <ImHeart className={`powerups__heart ${lives >= 1 && "red"}`} />
          <ImHeart className={`powerups__heart ${lives >= 2 && "red"}`} />
          <ImHeart className={`powerups__heart ${lives === 3 && "red"}`} />
        </div>
        <div className="powerups__name">Lives</div>
      </div>
      <div className="powerups__each">
        <div className="powerups__icon">
          <BiEraser className="powerups__heart" />
        </div>
        <div className="powerups__name">Eraser</div>
      </div>
      <div className="powerups__each">
        <div className="powerups__icon"></div>
        <div className="powerups__name">Lives</div>
      </div>
    </div>
  );
};

export default Powerups;

export const LostLife = ({ close, next }) => {
  return (
    <>
      <div className="overlay" onClick={close}></div>

      <div className="life__modal">
        Oops! Time's up. You've lost a life.
        <button onClick={next} className="btn next-btn2">
          Next
        </button>
      </div>
    </>
  );
};
