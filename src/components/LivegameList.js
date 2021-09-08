import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import yellowCoin from "../img/yellow-coin.svg";
import undrawVidGame from "../img/undraw_video_game_night_8h8m 2.svg";
import football from "../img/football.svg";
import { basicShare } from "../hooks/usePhoto";
import { capitalize } from "../Helpers/Functions";
import musicImg from "../img/music-Img.svg";
import Nav from "./NavLink";
import Header from "./Header";
import notifications from "./LocalNotification";
import { Store } from "../context/Store";

//1631106300000
const LivegameList = ({ livegames }) => {
  const history = useHistory();
  const { dispatch, state } = useContext(Store);

  const storedLivegames =
    livegames.length !== 0 ? livegames : state.allLiveGames;
  const joinLiveGame = (livegame) => {
    dispatch({ type: "ADDCURRENTLIVEGAME", payload: livegame });
    history.push(`/live-participants/${livegame.categoryName}`);
  };
  return (
    <>
      {storedLivegames.map((l) => {
        const {
          activeParticipants,
          activeStatus,
          categoryName,
          entryFee,
          gameTime,
          participants,
          questions,
          reward,
          shares,
          _id,
        } = l;
        return (
          <div className="homePage-next-live-game" key={_id}>
            <h3 className="home-page-header">Next Live Game</h3>
            <div className="homePage-next-live-game__description">
              <div className="btn time-btn  btn-top-right">
                <span className="timer">45mins</span>
              </div>
              <h1 className="description-header">{capitalize(categoryName)}</h1>
              <p className="home-page-text text-small-width">
                Questions on {categoryName} only
              </p>
              <img src={football} alt="" className="homePage-img" />
              <div className="homePage-next-live-game__description__entry">
                <div className="entry">
                  <span className="entry-text">Entry fee:</span>
                  <span className="entry-figure">{entryFee}</span>
                  <span className="coin">
                    <img src={yellowCoin} alt="" />
                  </span>
                </div>
                <div className="reward">
                  <span className="entry-text">Reward:</span>
                  <span>#</span>
                  <span className="entry-figure">{reward}</span>
                </div>
              </div>
            </div>
            <div className="homePage-btn-container">
              <button onClick={() => basicShare()} className="btn homePage-btn">
                Share
              </button>
              <button
                className="btn homePage-btn"
                onClick={() => {
                  //   notifications.schedule();
                  joinLiveGame(l);
                }}
              >
                Join Game
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LivegameList;
