import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { GiCoins } from "react-icons/gi";
import { Store, get } from "../../context/Store";
import Questions from "../Questions.js";
import Countdown from "../Countdown.js";
import Drawer from "@material-ui/core/Drawer";
import { IoIosPeople, IoMdPaper } from "react-icons/io";
import { FcAlarmClock } from "react-icons/fc";
import { IonSpinner } from "@ionic/react";
import "../style2.css";

const GameMode = () => {
  const { dispatch, state } = useContext(Store);
  const history = useHistory();
  const [anchor, setAnchor] = useState("");
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(true);
  const [auth, setAuth] = useState({});
  const [firstQuestion, setFirstQuestion] = useState({});

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

  const fetchLivegame = async () => {
    const identifier = state.isTime[1]?.categoryId
      ? state.isTime[1]?.categoryId
      : state.currentLiveGame._id;

    const token = await get("token");

    setAuth({ identifier: identifier, token: token });

    fetch(` https://anter-trivia-game.herokuapp.com/api/v1/user/gamezone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId: identifier }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from joining");
        setLoading(false);
        if (
          data.message === "Question has been returned" ||
          data.message === "Next Question."
        ) {
          const questionObj = {
            question: data.question,
            options: data.options,
          };
          setFirstQuestion(questionObj);
          setPlaying(true);
        } else {
          setMessage(data.message);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchLivegame();
  }, []);

  return (
    <div>
      {(loading || message) && !playing && (
        <div className="centralize">
          {loading && <IonSpinner name="bubbles" />}
          {message && <p className="error__span">{message} </p>}
          {!loading && !playing && (
            <button
              onClick={() => history.push("/homepage")}
              className="btn shortbtn"
              style={{ marginTop: "10px" }}
            >
              Go Back To HomePage
            </button>
          )}
        </div>
      )}

      {!loading && playing && (
        <>
          {/* <div className="live__game__header">
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
          </div>
          <Drawer
            anchor={anchor}
            open={position[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawer__div">
              {anchor === "left" ? "Participants" : "Rules"}
            </div>
          </Drawer> */}
          <Questions firstQuestion={firstQuestion} auth={auth} />
        </>
      )}
    </div>
  );
};

export default GameMode;

//  <div className="live__game__header">
//         <span
//           className="live__game__header__span"
//           onClick={() => {
//             goLeft();
//             setAnchor("left");
//           }}
//         >
//           <IoIosPeople />
//           Participants
//         </span>
//         <span
//           className="live__game__header__span"
//           onClick={() => {
//             goRight();
//             setAnchor("right");
//           }}
//         >
//           <IoMdPaper />
//           Rules
//         </span>
//       </div>
//       <Drawer
//         anchor={anchor}
//         open={position[anchor]}
//         onClose={toggleDrawer(anchor, false)}
//       >
//         <div className="drawer__div">
//           {anchor === "left" ? "Participants" : <RulesComponent />}
//         </div>
//       </Drawer>
