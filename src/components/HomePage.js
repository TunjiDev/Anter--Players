import { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import yellowCoin from "../img/yellow-coin.svg";
import undrawVidGame from "../img/undraw_video_game_night_8h8m 2.svg";
import football from "../img/football.svg";
import { basicShare } from "../hooks/usePhoto";
import { Store, get, set, remove } from "../context/Store";
import musicImg from "../img/music-Img.svg";
import Nav from "./NavLink";
import Header from "./Header";
import notifications from "./LocalNotification";
import LivegameList from "./LivegameList";
import { IonSpinner } from "@ionic/react";
import RedirectModal from "./RedirectModal";

const HomePage = () => {
  const history = useHistory();
  const { state, dispatch, redirectToGameZone, interval } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const [livegames, setLivegames] = useState([]);
  const [redirectModal, setRedirectModal] = useState(false);
  const [liveId, setLiveId] = useState("");

  const getUser = async () => {
    setLoading(true);
    const token = await get("token");

    dispatch({ type: "GETTOKEN", payload: token });
    fetch("https://anter-trivia-game.herokuapp.com/api/v1/user/livegame", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error("Something went wrong");
          });
        }
      })
      .then((data) => {
        console.log(data, "livegames");
        const livegames = data.data.livegames;
        setLivegames(livegames);
        dispatch({ type: "ADDALLLIVEGAME", payload: livegames });
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("https://anter-trivia-game.herokuapp.com/api/v1/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "user details");
        setLoading(false);
        if (data.message) throw new Error(data.message);
        else {
          dispatch({
            type: "ADDINFO",
            payload: {
              username: data.user.username,
              coins: data.user.coins,
              earnings: data.user.earnings,
              erasers: data.user.erasers,
              extraLives: data.user.extraLives,
              phone: data.user.phone,
              activeGames: data.user.activeGames,
              profilePicture: data.user.profilePicture,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (state.reload || JSON.stringify(state.userDetails) === "{}") {
      getUser();
    }
    dispatch({
      type: "RELOADHOMEPAGE",
      payload: false,
    });
    dispatch({ type: "ADDCURRENTLIVEGAME", payload: [] });
    dispatch({
      type: "ITSTIME",
      payload: [],
    });
    const currentTimer = interval.current;

    return () => {
      clearInterval(currentTimer);
    };
  }, []);

  useEffect(() => {
    redirectToGameZone();
    if (state.isTime[0]) {
      setRedirectModal(true);
      setLiveId(state.isTime[1].categoryId);
    }
  }, [state]);

  return (
    <div className="container" style={{ color: "white" }}>
      <Header />
      <div className="homePage-instant-game">
        <h3 className="home-page-header">Instant game</h3>
        <div className="homePage-instant-game__description">
          <p className="home-page-text">
            You can play instantly with someone online
          </p>
          <img src={undrawVidGame} alt="" className="homePage-img" />
        </div>
        <button
          onClick={() => {
            history.push("/selectlevel");
          }}
          className="btn homePage-btn btn-right"
        >
          Play instantly
        </button>
      </div>
      {loading ? (
        <IonSpinner
          name="bubbles"
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            margin: "auto",
            marginTop: "50px",
            color: "white",
          }}
        />
      ) : (
        <LivegameList livegames={livegames} />
      )}

      <Nav />
      {redirectModal && <RedirectModal liveId={liveId} />}
    </div>
  );
};

export default HomePage;
