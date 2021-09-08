import React, { useState, useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router";
import { GiCoins } from "react-icons/gi";

import { Store } from "../../context/Store";

const GameMode = () => {
  const { dispatch, state } = useContext(Store);
  const history = useHistory();

  const deductCoins = () => {
    const remnant = state.userDetails.coins - 100;
    dispatch({
      type: "ADDINFO",
      payload: { ...state.userDetails, coins: remnant },
    });
  };

  return (
    <div className="falseTime__container">
      <h1>Game mode</h1>
    </div>
  );
};

export default GameMode;
