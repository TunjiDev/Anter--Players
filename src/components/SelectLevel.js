import { useState, useContext } from "react";
import { GiCoins } from "react-icons/gi";
import { SearchPlayerModal } from "./RedirectModal";
import { Store } from "../context/Store";
import "./style2.css";

const SelectLevel = () => {
  const [searchModal, setSearchModal] = useState(false);
  const [category, setCategory] = useState("");
  const [stake, setStake] = useState("");
  const [error, setError] = useState(false);
  const { dispatch, state } = useContext(Store);

  const startSearch = (e) => {
    e.preventDefault();
    setError("");
    if (!category || !stake) {
      setError("Please select both category and stake amount");
      return;
    } else if (!state.userDetails.coins || state.userDetails.coins < category) {
      setError("Insufficient coin balance. Please top up.");
      return;
    } else setSearchModal(true);
  };

  return (
    <div className="questions" style={{ color: "white" }}>
      <form action="" className="questions__select" onSubmit={startSearch}>
        <label htmlFor="select">
          <p className="question-spash-header">Select Category</p>
        </label>
        <select
          style={{ backgroundColor: "white" }}
          className="questions__select-difficulty"
          name="select"
          id="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Animes" className="levels">
            Animes
          </option>
          <option value="Football" className="levels">
            Football
          </option>
          <option value="Music" className="levels">
            Music
          </option>
        </select>
        <p>Stake with:</p>
        <div className="stake_div">
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(100)}
          >
            <p>
              100
              <GiCoins className="stake__coins" />
            </p>
            <span className="stake__span">Win 1000 Naira</span>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(300)}
          >
            <p>
              300
              <GiCoins className="stake__coins" />
            </p>
            <span className="stake__span">Win 3200 Naira</span>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(500)}
          >
            <p>
              500
              <GiCoins className="stake__coins" />
            </p>
            <span className="stake__span">Win 5,500 Naira</span>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(1000)}
          >
            <p>
              1000
              <GiCoins className="stake__coins" />
            </p>
            <span className="stake__span">Win 10,000 Naira</span>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(2000)}
          >
            <p>
              2000
              <GiCoins className="stake__coins" />
            </p>
            <span className="stake__span">Win 22,500 Naira</span>
          </button>
          <button
            type="button"
            className="each__stake"
            onClick={() => setStake(5000)}
          >
            <p>
              5000
              <GiCoins className="stake__coins" />
            </p>
            <span className="stake__span">Win 50,000 Naira</span>
          </button>
        </div>
        {error && <p className="error__span redText">{error}</p>}
        <button className="btn select-btn">
          <p>Continue</p>
        </button>
      </form>
      {searchModal && (
        <SearchPlayerModal
          category={category}
          stake={stake}
          close={() => setSearchModal(false)}
        />
      )}
    </div>
  );
};

export default SelectLevel;
