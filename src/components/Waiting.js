import React, { useState, useEffect } from "react";
let t;
const Waiting = ({ time, request }) => {
  const [seconds, setSeconds] = useState(time);
  useEffect(() => {
    t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    seconds === 0 && request();
    return () => {
      clearInterval(t);
    };
  });
  return (
    <div className="centralize">
      <div className="overlay"></div>
      <div>Next question in {seconds} seconds. Hold on.</div>
    </div>
  );
};

export default Waiting;
