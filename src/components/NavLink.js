import friends from "../img/vs-friends.svg"
import activeLive from "../img/active-life-game.svg"
import extra from "../img/extra.svg"
import ranking from "../img/Ranking.svg"
import profile from "../img/profile.svg"
import {NavLink} from 'react-router-dom'
import {FaCrown} from 'react-icons/fa'
import {  LiveTv, PeopleAlt, Add,Person } from "@material-ui/icons"

const Nav = () => {
    return (
        <div>
            <footer className='menu'>
            <NavLink role="div" to="/homepage" activeClassName='active-text'  className="menu__property">
              
                <LiveTv style={{fontSize:'2.6rem'}}/>
                <span className="menu-text menu__property--bottom  ">
                    Live Game
                </span>
            </NavLink>
    
            <NavLink role="div" to="/friends" activeClassName='active-text'   className="menu__property">
              
                <PeopleAlt style={{fontSize:'2.6rem'}}/>
                <span className="menu-text menu__property--bottom">
                    Vs Friends
                </span>
            </NavLink>

            <NavLink role="div" to="/extra" activeClassName='active-text'   className="menu__property">
            <Add style={{fontSize:'2.6rem'}}/>
                <span className="menu-text menu__property--bottom">
                    Extra
                </span>
            </NavLink> 
            <NavLink role="div" to="/rankingpage" activeClassName='active-text'   className="menu__property">
                <FaCrown style={{fontSize:'2.3rem'}}/>
                <span className="menu-text menu__property--bottom">
                    Ranking
                </span>
            </NavLink>

         
            <NavLink role="div" to="/profile" activeClassName='active-text'   className="menu__property">
            <Person style={{fontSize:'2.6rem'}}/>
                <span className="menu-text menu__property--bottom profile-name">
                    Profile
                </span>
            </NavLink>
            </footer>
        </div>
    )
}

export default Nav
