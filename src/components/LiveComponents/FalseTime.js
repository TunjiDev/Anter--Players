import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { GiCoins } from "react-icons/gi";
import { IonSpinner } from "@ionic/react";
import { convertTime } from "../../Helpers/Functions";

import { Store, get } from "../../context/Store";

const FalseTime = ({ setGameMode }) => {
  const { dispatch, state } = useContext(Store);
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [timerHour, setTimerHour] = useState("00");
  const [timerMinute, setTimerMinute] = useState("00");
  const [timerSecond, setTimerSecond] = useState("00");
  const [loading, setLoading] = useState(true);
  const [loadingJoin, setLoadingJoin] = useState(false);
  let interval = useRef;

  const checkGame = () => {
    const inIt = [];
    const allActiveGames = state.userDetails.activeGames;

    allActiveGames.forEach((a) => {
      if (a.categoryId === state.currentLiveGame._id) {
        inIt.push(state.currentLiveGame);
        setMessage("You have successfully joined this live game.");
      }
    });
    setLoading(false);
    return inIt.length !== 0;
  };
  const [hidePayBtn, setHidePayBtn] = useState(false);

  const startTimer = () => {
    const { year, month, day, hour, minute, seconds } = convertTime(
      state.currentLiveGame.gameTime
    );
    const countDownTime = new Date(
      +year,
      +month,
      +day,
      +hour,
      +minute,
      +seconds,
      +seconds
    ).getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      let differenceInTimes = countDownTime - now;
      const hours = Math.floor(
        (differenceInTimes % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInTimes % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((differenceInTimes % (1000 * 60)) / 1000);

      if (differenceInTimes < 0) {
        clearInterval(interval.current);
        setGameMode(true);
      } else {
        setTimerHour(hours);
        setTimerMinute(minutes);
        setTimerSecond(seconds);
      }
    }, 1000);
  };
  const deductCoins = async () => {
    setLoadingJoin(true);
    let identifier = history.location.pathname.split("/");

    identifier = identifier[2].split("%20").join(" ");

    const token = await get("token");
    const body = { categoryName: identifier };

    fetch(`https://anter-trivia-game.herokuapp.com/api/v1/user/livegame`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setMessage(data.message);
        else {
          const remnant =
            state.userDetails.coins - state.currentLiveGame.entryFee;
          dispatch({
            type: "ADDINFO",
            payload: { ...state.userDetails, coins: remnant },
          });
          dispatch({
            type: "RELOADHOMEPAGE",
            payload: true,
          });
        }
        setLoadingJoin(false);
        setHidePayBtn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    startTimer();
    const inIt = checkGame();
    setHidePayBtn(inIt);

    const currentTimer = interval.current;
    return () => {
      clearInterval(currentTimer);
    };
  }, []);

  return (
    <div className="falseTime__container">
      {loading ? (
        <IonSpinner name="bubbles" />
      ) : (
        <>
          <h1>Game starts in : </h1>
          <div className="time__container">
            <div className="time__object">
              <span className="time__numeric">{timerHour}</span>
              <span className="time__alpha">hours</span>
            </div>
            <p className="colon">:</p>
            <div className="time__object">
              <span className="time__numeric">{timerMinute}</span>
              <span className="time__alpha">minutes</span>
            </div>
            <p className="colon">:</p>
            <div className="time__object">
              <span className="time__numeric">{timerSecond}</span>
              <span className="time__alpha">seconds</span>
            </div>
          </div>
          {message && <p className="error__span">{message}</p>}
          {!hidePayBtn && (
            <button
              onClick={deductCoins}
              className="btn homePage-btn false__time-btn"
            >
              Pay {state.currentLiveGame.entryFee}
              <GiCoins style={{ color: "yellow" }} />
              {loadingJoin && (
                <IonSpinner name="bubbles" style={{ display: "block" }} />
              )}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default FalseTime;
