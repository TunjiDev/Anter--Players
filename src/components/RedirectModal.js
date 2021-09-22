import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Store, get } from "../context/Store";
import { AiOutlineWifi } from "react-icons/ai";
import { BiWifiOff } from "react-icons/bi";
let t;
const RedirectModal = ({ liveId }) => {
  const [seconds, setSeconds] = useState(10);
  const history = useHistory();
  useEffect(() => {
    t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    seconds === 0 && history.push(`/livegame/${liveId}`);
    return () => {
      clearInterval(t);
    };
  });
  return (
    <>
      <div className="overlay"></div>

      <div className="redirect__modal">
        Redirecting to Live Game in {seconds} seconds
      </div>
    </>
  );
};

export default RedirectModal;

export const SearchPlayerModal = ({ category, stake, close }) => {
  const fetchQuestions = async (e) => {
    e.preventDefault();
    console.log(category, stake);

    const token = await get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // fetch(`https://anter-trivia-game.herokuapp.com/api/v1/user/livegame`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //     authorization: `Bearer ${token}`,
    //   },
    //   // body: JSON.stringify(body),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data, "from select category");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  return (
    <>
      <div className="overlay" onClick={close}></div>

      <div className="searchPlayer__modal">
        <div className="wifi__search">
          <AiOutlineWifi className="newWifi" />
          <p>Searching for player...</p>
        </div>
        {/* <div>
          <h5 style={{ textAlign: "center" }}>
            1 player found:{" "}
            <span style={{ color: "#8a2be2", fontWeight: "600" }}>Nafisa</span>
          </h5>
          <button className="btn select-btn">Play</button>
          <button className="btn select-btn">Keep searching</button>
        </div> */}
      </div>
    </>
  );
};
