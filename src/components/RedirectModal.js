import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
let t;
const RedirectModal = ({ liveId }) => {
  const [seconds, setSeconds] = useState(1);
  const history = useHistory();
  useEffect(() => {
    t = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    seconds === 0 && history.push(`/live-participants/${liveId}`);
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
