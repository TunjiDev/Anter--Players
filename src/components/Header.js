import extraLife from "../img/extral-life.svg"
 import eraser from "../img/eraser.svg"
 import plus from "../img/plus.svg"
 import yellowCoin from "../img/yellow-coin.svg"
 import naira from  '../img/naira.svg'
const Header = ({handleHide}) => {
    return (
        <div>
             <header className="navigation">
           <div className="nav">
          
            <div className="nav__property">
                <div className="nav__property--top">
                    <img src={naira} alt="" className="icons"/>
                    <span className="nav-earned amount-earned">
                        500
                    </span>
                </div>
                <div className="nav__property--bottom">
                    <p className="nav-text">Earned</p>
                </div>
            </div>
            <div className="nav__property">
                <div className="nav__property--top">
                    <img src={yellowCoin} alt="" className="icons"/>
                    <span className="nav-earned amount-earned">
                        400
                    </span>
                </div>
                <div className="nav__property--bottom">
                    <p className="nav-text">coins</p>
                </div>
            </div>

          
             <div className="nav__property">
                <div className="nav__property--top">
                    <img src={extraLife} alt="" className="icons"/>
                    <span className="nav-earned amount-earned">
                        3
                    </span>
                </div>
                <div className="nav__property--bottom">
                    <p className="nav-text">Extra Life</p>
                </div>
            </div>

           
             <div className="nav__property">
                <div className="nav__property--top" onClick={handleHide}>
                    <img src={eraser} alt="" className="icons"/>
                    <span className="nav-earned amount-earned">
                        1
                    </span>
                </div>
                <div className="nav__property--bottom">
                    <p className="nav-text">Eraser</p>
                </div>
            </div>
           </div> 

           <a href="/" role="button" className="btn nav-btn">
               <img src={plus} alt="" className="icons"/>
               <span className="nav-btn-text">
                   Get More
               </span>
           </a>
        </header>
        </div>
    )
}

export default Header
