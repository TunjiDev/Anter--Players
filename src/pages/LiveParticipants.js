import React, { useEffect, useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { IoIosPeople, IoMdPaper } from "react-icons/io";
import { FcAlarmClock } from "react-icons/fc";
import { Store, get } from "../context/Store";
import { IonSpinner } from "@ionic/react";
import { useHistory } from "react-router";
import "./MyStyles.css";
import { Rules } from "../Helpers/DummyData";
import FalseTime from "../components/LiveComponents/FalseTime";
import GameMode from "../components/LiveComponents/GameMode";

const RulesComponent = () => {
  return (
    <>
      <h1 className="rules__h1"> Rules </h1>
      {Rules.map((r, i) => (
        <li key={i} className="live_game_rules">
          {/* <span className="rules__span">{i + 1}</span> */}
          {r}
        </li>
      ))}
      <h1 className="rules__h1">Good luck!</h1>
      <FcAlarmClock className="rules__h1 goodluck" />
    </>
  );
};

const LiveParticipants = () => {
  const history = useHistory();
  const { state } = useContext(Store);
  const countdownTime = state.currentLiveGame.gameTime;
  const now = new Date().getTime();
  const differenceInTimes = countdownTime - now;
  const [gameMode, setGameMode] = useState(differenceInTimes === 0 && true);
  const [loading, setLoading] = useState(false);
  const [anchor, setAnchor] = useState("");

  const [position, setPosition] = useState({
    left: false,

    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setPosition({ ...position, [anchor]: open });
  };

  const goLeft = () => {
    setPosition({ right: false, left: true });
    toggleDrawer("left", true);
  };
  const goRight = () => {
    setPosition({ left: false, right: true });
    toggleDrawer("left", true);
  };

  return (
    <div>
      <div className="live__game__header">
        <span
          className="live__game__header__span"
          onClick={() => {
            goLeft();
            setAnchor("left");
          }}
        >
          <IoIosPeople />
          Participants
        </span>
        <span
          className="live__game__header__span"
          onClick={() => {
            goRight();
            setAnchor("right");
          }}
        >
          <IoMdPaper />
          Rules
        </span>
      </div>
      <Drawer
        anchor={anchor}
        open={position[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        <div className="drawer__div">
          {anchor === "left" ? "Participants" : <RulesComponent />}
        </div>
      </Drawer>
      {differenceInTimes !== 0 && <FalseTime setGameMode={setGameMode} />}
      {(differenceInTimes === 0 || gameMode) && <GameMode />}
    </div>
  );
};
export default LiveParticipants;
