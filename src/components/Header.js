import { useContext } from "react";
import { Store } from "../context/Store";
import extraLife from "../img/extral-life.svg";
import eraser from "../img/eraser.svg";
import plus from "../img/plus.svg";
import { GiCoins } from "react-icons/gi";
import naira from "../img/naira.svg";
const Header = ({ handleHide }) => {
  const { dispatch, state } = useContext(Store);
  return (
    <div>
      <header className="navigation">
        <div className="nav">
          <div className="nav__property">
            <div className="nav__property--top">
              <img src={naira} alt="" className="icons" />
              <span className="nav-earned amount-earned">
                {state.userDetails.earnings ? state.userDetails.earnings : 0}
              </span>
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">Earned</p>
            </div>
          </div>
          <div className="nav__property">
            <div className="nav__property--top">
              <span className="nav-earned amount-earned">
                {state.userDetails.coins ? state.userDetails.coins : 0}
              </span>
              <GiCoins
                alt=""
                className="icons"
                style={{ color: "yellow", marginLeft: "5px" }}
              />
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">
                coin{state.userDetails.coins > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="nav__property">
            <div className="nav__property--top">
              <span className="nav-earned amount-earned">
                {state.userDetails.extraLives
                  ? state.userDetails.extraLives
                  : 0}
              </span>
              <img src={extraLife} alt="" className="icons" />
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">
                Extra Li{state.userDetails.extraLives > 1 ? "ves" : "fe"}
              </p>
            </div>
          </div>

          <div className="nav__property">
            <div className="nav__property--top" onClick={handleHide}>
              <span className="nav-earned amount-earned">
                {state.userDetails.erasers ? state.userDetails.erasers : 0}
              </span>
              <img src={eraser} alt="" className="icons" />
            </div>
            <div className="nav__property--bottom">
              <p className="nav-text">
                Eraser{state.userDetails.erasers > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* <a href="/" role="button" className="btn nav-btn">
          <img src={plus} alt="" className="icons" />
          <span className="nav-btn-text">Get More</span>
        </a> */}
      </header>
    </div>
  );
};

export default Header;
