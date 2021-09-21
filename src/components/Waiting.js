import React, { useState, useEffect } from "react";
import { FcAlarmClock } from "react-icons/fc";
let t;
const Waiting = ({ time, request }) => {
  const [seconds, setSeconds] = useState(time);
  useEffect(() => {
    t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    if (seconds <= 0) {
      request();
      clearInterval(t);
    }
    return () => {
      clearInterval(t);
    };
  });
  return (
    <div className="centralize white">
      <div className="overlay"></div>

      <FcAlarmClock className="rules__h1 goodluck" />
      <p style={{ marginTop: "50px" }}>Next Question coming right up!</p>
    </div>
  );
};

export default Waiting;
