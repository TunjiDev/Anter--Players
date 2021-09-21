import { useState, useEffect, useContext } from "react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
// import CircularProgressWithLabel from "@mui/material/CircularProgress";
import { CircularProgress } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useSound from "use-sound";
import right from "../Sounds/right.wav";
import wrong from "../Sounds/wrong.wav";
import timerAttention from "../Sounds/timerAttention.wav";
import { useHistory } from "react-router-dom";
import { Store } from "../context/Store";
import { shuffle } from "../Helpers/Functions";
import { GiCoins } from "react-icons/gi";
import Powerups, { LostLife } from "./Powerups";
import Waiting from "./Waiting";
import Countdown from "./Countdown";
const TIMER_START_VALUE = 10;
const GAME_API = "https://anter-trivia-game.herokuapp.com/api/v1/user/gamezone";

const Question = ({ firstQuestion, auth }) => {
  const history = useHistory();
  const { state } = useContext(Store);
  const { token, identifier } = auth;
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [hideOption, setHideOption] = useState(false);
  const [flash, setFlash] = useState(false);
  const [success] = useSound(right);
  const [fail] = useSound(wrong);
  const [attention] = useSound(timerAttention);

  const [wrongAnswer, setWrongAnswer] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [indexx, setIndex] = useState();
  const [lives, setLives] = useState(
    state.userDetails.extraLives >= 3 ? 3 : state.userDetails.extraLives
  );
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameModal, setGameModal] = useState(false);
  const [question, setQuestion] = useState(firstQuestion);
  const { optionA, optionB, optionC } = question.options[0]
    ? question.options[0]
    : {};

  const answerOptions = [optionA, optionB, optionC];
  const [low, setLow] = useState(false);
  let t1;
  let t2;
  let t3;

  useEffect(() => {
    startGame && startMainGame();
    if (timer < 5) {
      setLow(true);
    }
    if (timer <= 3) {
      warning();
    }
    if (timer === 0) {
      failHandler();
    }
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, [timer]);

  const updateTimer = () => {
    if (timer > 0 && !revealAnswers) {
      t1 = setTimeout(() => setTimer(timer - 1), 1000);
    }
  };

  const warning = () => {
    t2 = setInterval(() => attention(), 1000);
  };
  const startMainGame = () => {
    setStartGame(true);
    setTimeout(() => updateTimer(), 1000);
  };

  const handleNextQuestionClick = () => {
    clearInterval(t2);
    clearTimeout(t1);
    setRevealAnswers(false);
    setCurrentQuestionIndex((prev) => prev + 1);
    setCorrectAnswer(false);
    setWrongAnswer(false);
    setSelectedAnswer("");
    setSecondsRemaining(null);

    fetch(GAME_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gameId: identifier,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from nextQuestion");
        if (data.message === "Congrats! You have won ₦10000 naira!") {
          gameOver(true);
          setGameOverMessage(data.message);
        } else {
          const questionObj = {
            question: data.question,
            options: data.options,
          };
          setQuestion(questionObj);

          setLow(false);
          setHideOption(false);
          setIndex(null);
          setTimer(TIMER_START_VALUE);
          setFlash(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const failHandler = () => {
    clearInterval(t2);
    clearTimeout(t1);
    setGameModal(true);
    if (lives === 1) {
      setTimeout(() => {
        setGameModal(false);
        setGameOver(true);
        clearInterval(t2);
        clearTimeout(t1);
      }, 1500);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    console.log(selectedAnswer, "selected");
    setSelectedAnswer(selectedAnswer);
    clearTimeout(t1);
    clearInterval(t2);
    clearInterval(t3);
    setRevealAnswers(true);
    setFlash(true);
    if (selectedAnswer === "") return;

    fetch(` https://anter-trivia-game.herokuapp.com/api/v1/user/gamezone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gameId: identifier,
        answer: selectedAnswer.trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from answer click");

        if (data.message === "Correct!") {
          setCorrectAnswer(true);
          success();
          setScore(score + 1);
          const currentSeconds = (+data.timer - new Date().getTime()) / 1000;
          console.log(currentSeconds, "cur seconds");
          setSecondsRemaining(currentSeconds);
        } else if (data.message === "Wrong!") {
          clearInterval(t3);
          fail();
          setWrongAnswer(true);
          failHandler();
        } else {
          gameOver(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const action = (action) => {
    fetch(` https://anter-trivia-game.herokuapp.com/api/v1/user/gamezone`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gameId: identifier,
        action: action,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, `from ${action} click`);
        if (action === "extralife") {
          setLives((prev) => prev - 1);
          setGameModal(false);
          const questionObj = {
            question: data.question,
            options: data.options,
          };
          setQuestion(questionObj);
          setRevealAnswers(false);
          setWrongAnswer(false);
          setCorrectAnswer(false);
          setLow(false);
          setHideOption(false);
          setIndex(null);
          setTimer(TIMER_START_VALUE);
          setFlash(false);
        } else {
          console.log(action);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const giveUp = () => {
    setGameOver(true);
    setGameModal(false);
  };
  const useEraser = () => {
    setHideOption(true);
    action("eraser");
    // console.log(question.answerOptions, "options");
    // const filtered = question.answerOptions.filter(
    //   (q) => q !== question.answer
    // );
    // setErasedOptions(filtered);
    // const shuffled = shuffle(filtered);
    // const selected = shuffled[Math.floor(Math.random() * 3)];
    // const wrongAnswer = question.answerOptions.findIndex(
    //   (option) => option === selected
    // );

    // setIndex(wrongAnswer);
  };
  if (!startGame) return <Countdown startGame={startMainGame} />;
  if (secondsRemaining)
    return (
      <Waiting time={secondsRemaining} request={handleNextQuestionClick} />
    );
  else
    return (
      <div className="questions__container" style={{ color: "white" }}>
        {!gameOver ? (
          <>
            <Powerups
              lives={lives}
              handleHide={useEraser}
              hideOption={hideOption}
            />
            <div className="questions__QandA">
              <div className="questions__timer">
                <span className="timer">{timer}</span>
                {/* <CircularProgress
                  className="timer"
                  variant="determinate"
                  value={(timer / TIMER_START_VALUE) * 100}
                  // value={timer}
                /> */}
              </div>
              <div className="timer-wrapper">
                <div
                  className={`timer-countdown-bar ${low && "red"} ${
                    timer > 7 && "green"
                  }`}
                  style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
                ></div>
              </div>
              <div className="question-count">
                <span>Question {currentQuestionIndex}</span>
              </div>
              <div className="questions__display">{question.question}?</div>

              <div>
                {answerOptions.map((answerOption, index) => (
                  <div key={index} className="answer-item">
                    <AnswerButton
                      answerOption={answerOption}
                      correctAnswer={correctAnswer}
                      isSelectedAnswer={answerOption === selectedAnswer}
                      revealAnswers={revealAnswers}
                      handleAnswerClick={handleAnswerClick}
                      // index={index}
                      // indexx={indexx}
                      flash={flash}
                      wrongAnswer={wrongAnswer}
                    />
                  </div>
                ))}
              </div>
              {/* 
              {revealAnswers && (
                <button
                  onClick={handleNextQuestionClick}
                  className="btn next-btn"
                >
                  Next
                </button>
              )} */}
            </div>
          </>
        ) : (
          <div>
            <div className="questions__result">
              <h3 className="question-splash-header">{gameOverMessage}</h3>
              <div className="questions__result--scores">
                <div className="scores">
                  <span>
                    <FontAwesomeIcon
                      style={{ color: "green", fontSize: "3rem" }}
                      icon={faCheckCircle}
                    />
                  </span>
                  <span>
                    <span className="number-of-correct">{score}</span> Correct
                  </span>
                </div>
                <div className="scores">
                  <span>
                    <FontAwesomeIcon
                      style={{ color: "red", fontSize: "3rem" }}
                      icon={faTimesCircle}
                    />
                  </span>
                  <span>
                    <span className="number-of-incorrect">
                      {question.length - score}
                    </span>
                    Incorrect
                  </span>
                </div>
              </div>
              <div className="questions__result--earned">
                <div>
                  <h4 className="earned">You Earned</h4>
                  <div className="coins-earned-container">
                    <span>
                      <img src="../img/yellow-coin.svg" alt="" />
                    </span>
                    <span className="coins-earned">
                      {score} <GiCoins className="yellow__coins" />
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => history.push("/homepage")}
                className="btn startGame"
                style={{ marginTop: "10px" }}
              >
                Go Back To HomePage
              </button>
            </div>
          </div>
        )}
        {gameModal && (
          <LostLife
            close={giveUp}
            lives={lives}
            action={() => action("extralife")}
          />
        )}
      </div>
    );
};

/******* ANSWER BUTTON COMPONENT ********/
const AnswerButton = ({
  answerOption,
  correctAnswer,
  isSelectedAnswer,
  revealAnswers,
  index,
  indexx,
  handleAnswerClick,
  flash,
  wrongAnswer,
}) => {
  let backgroundColor, icon;
  if (isSelectedAnswer) {
    backgroundColor = "#3b076b";
    icon = faTimesCircle;
  }
  if (correctAnswer && isSelectedAnswer) {
    backgroundColor = "#2f922f";
    icon = faCheckCircle;
  }
  if (wrongAnswer && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else {
    icon = faCircleRegular;
  }
  // if (isSelectedAnswer) {
  //   backgroundColor = "#3b076b";
  //   icon = faTimesCircle;
  // } else if (correctAnswer && isSelectedAnswer) {
  //   backgroundColor = "#2f922f";
  //   icon = faCheckCircle;
  // } else if (wrongAnswer && isSelectedAnswer) {
  //   backgroundColor = "#ff3333";
  //   icon = faTimesCircle;
  // } else {
  //   icon = faCircleRegular;
  // }

  return (
    <div
      className={`questions__options  ${isSelectedAnswer && flash && "flash"}`}
      style={{ backgroundColor: backgroundColor, color: "white" }}
      onClick={() => handleAnswerClick(answerOption)}
      // onClick={() => handleAnswerClick(index === indexx ? "" : answerOption)}
    >
      <div className="answer__icon">
        <FontAwesomeIcon className="answer-item-circle" icon={icon} />
      </div>
      <span className="answer__option">
        {answerOption}
        {/* {index === indexx ? "" : answerOption} */}
      </span>
    </div>
  );
};

export default Question;
