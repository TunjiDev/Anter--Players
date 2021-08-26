import {useHistory} from 'react-router'
 import yellowCoin from "../img/yellow-coin.svg"
 import undrawVidGame from "../img/undraw_video_game_night_8h8m 2.svg"
 import football from "../img/football.svg"
 import {basicShare} from '../hooks/usePhoto'
 import musicImg from "../img/music-Img.svg"
import Nav from './NavLink'
import Header from "./Header"
import notifications from './LocalNotification'
 const HomePage=()=>{
     const history=useHistory()
     return(
    
      <div className="container" style={{color:'white'}}>
        <Header/> 
        <div className="homePage-instant-game">
            <h3 className="home-page-header">
                Instant game
            </h3>
            <div className="homePage-instant-game__description">
                <p className="home-page-text">
                    You can play instantly with someone online
                </p>
                <img src={undrawVidGame} alt="" className="homePage-img"/>
            </div>
            <button onClick={()=>{history.push('/selectlevel')}} className="btn homePage-btn btn-right">
                Play instantly
            </button>
        </div>

        <div className="homePage-next-live-game">
            <h3 className="home-page-header">
                Next Live Game
            </h3>
            <div className="homePage-next-live-game__description">
                <div className="btn time-btn  btn-top-right">
                    <span className="timer">45mins</span>
                </div>
                <h1 className="description-header">
                    Football!
                </h1>
                <p className="home-page-text text-small-width">
                    Questions on football only
                </p>
                <img src={football} alt="" className="homePage-img"/>
                <div className="homePage-next-live-game__description__entry">
                    <div className="entry">
                        <span className="entry-text">
                            Entry:  
                        </span>  
                        <span className="entry-figure">400</span>
                        <span className="coin">
                            <img src={yellowCoin} alt=""/>
                        </span>

                    </div>
                    <div className="reward">
                        <span className="entry-text">
                            Reward:  
                        </span>  
                        <span>#</span>
                        <span className="entry-figure">5000</span>

                    </div>
                </div>
            </div>
            <div className="homePage-btn-container">
                <button  onClick={()=>basicShare()}className="btn homePage-btn">
                    Share
                </button>
                <button className="btn homePage-btn" onClick={()=>{
                    notifications.schedule() }}>
                    Join Game
                </button>
            </div>
        </div>

        <div className="homePage-upcoming-game">
            <h3 className="home-page-header">
                Next Live Game
            </h3>
            <div className="homePage-upcoming-game__description">
                <div className="btn time-btn  btn-top-right">
                    <span className="timer">45mins</span>
                </div>
                <h1 className="description-header">
                    Music
                </h1>
                <p className="home-page-text text-small-width">
                    No limit on questions
                </p>
                <img src={musicImg} alt="" className="homePage-img"/>
                <div className="homePage-upcoming-game__description__entry">
                    <div className="entry">
                        <span className="entry-text">
                            Entry:  
                        </span>  
                        <span className="entry-figure">400</span>
                        <span className="coin">
                            <img src={yellowCoin} alt=""/>
                        </span>

                    </div>
                    <div className="reward">
                        <span className="entry-text">
                            Reward:  
                        </span>  
                        <span>#</span>
                        <span className="entry-figure">5000</span>

                    </div>
                </div>
            </div>
            <div className="homePage-btn-container">
                <button className="btn homePage-btn" onClick={()=>basicShare()}>
                    Share
                </button>
                <button onClick={()=>{
                    notifications.schedule() }} className="btn homePage-btn">
                    Join Game
                </button>
            </div>
            
        </div>
      
           <Nav/>
      
    </div>
      
     )
 }

 export default HomePage