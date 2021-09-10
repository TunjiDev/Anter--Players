import { useState, useEffect, useContext } from "react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
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
import Countdown from "./Countdown";
const TIMER_START_VALUE = 10;

const Question = () => {
  const history = useHistory();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [hideOption, setHideOption] = useState(false);
  const [newOptions, setNewOptions] = useState();
  const [low, setLow] = useState(false);
  const [toUseEraser, setToUseEraser] = useState(false);
  const [flash, setFlash] = useState(false);
  const [success] = useSound(right);
  const [fail] = useSound(wrong);
  const [attention] = useSound(timerAttention);
  const { state } = useContext(Store);

  const [apiQuestions, setApiQuestions] = useState([state.Questions]);
  const [indexx, setIndex] = useState();
  const [lives, setLives] = useState(3);
  const [clickedBtn, setClickedBtn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [gameModal, setGameModal] = useState(false);
  const [questions, setQuestions] = useState(state.Questions);
  const [erasedOptions, setErasedOptions] = useState([]);
  let t1;
  let t2;

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
  const warning = () => {
    t2 = setInterval(() => attention(), 1000);
  };
  const startMainGame = () => {
    setStartGame(true);
    setTimeout(() => updateTimer(), 1000);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const updateTimer = () => {
    if (!revealAnswers && timer > 0) {
      t1 = setTimeout(() => setTimer(timer - 1), 1000);
    }
  };

  const handleNextQuestionClick = () => {
    clearInterval(t2);
    clearTimeout(t1);
    setRevealAnswers(false);
    setToUseEraser(true);
    setGameModal(false);
    setLow(false);
    setHideOption(false);
    setIndex(null);
    setTimer(TIMER_START_VALUE);
    setFlash(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setGameOver(true);
      clearTimeout(t1);
    }
  };

  const resetQuiz = () => {
    setTimer(TIMER_START_VALUE);
    setGameOver(false);
    setRevealAnswers(false);
    setCurrentQuestionIndex(0);
    setToUseEraser(true);
    setScore(0);
    setLives(3);
  };
  const failHandler = () => {
    clearTimeout(t1);

    if (lives > 1) {
      setLives((prev) => prev - 1);
      setGameModal(true);
      setTimeout(() => {
        setGameModal(false);
        setTimer(TIMER_START_VALUE);
        handleNextQuestionClick();
      }, 1500);
    }
    if (lives === 1) {
      setGameModal(true);
      setTimeout(() => {
        setGameModal(false);
        setGameOver(true);
        clearInterval(t2);
        clearTimeout(t1);
      }, 1500);
    }
  };

  const handleAnswerClick = (selectedAnswer) => {
    clearTimeout(t1);
    clearInterval(t2);
    setFlash(true);
    setSelectedAnswer(selectedAnswer);
    if (selectedAnswer === "") return;
    if (selectedAnswer === currentQuestion.answer) {
      success();
      setRevealAnswers(true);
      setScore(score + 1);
    } else {
      fail();
      setRevealAnswers(false);
      failHandler();
    }

    setTimeout(() => {
      handleNextQuestionClick();
    }, 15 00);
  };

  const useEraser = () => {
    setHideOption(true);

    const filtered = currentQuestion.answerOptions.filter(
      (q) => q !== currentQuestion.answer
    );
    setErasedOptions(filtered);
    const shuffled = shuffle(filtered);
    const selected = shuffled[Math.floor(Math.random() * 3)];
    const wrongAnswer = currentQuestion.answerOptions.findIndex(
      (option) => option === selected
    );
    setIndex(wrongAnswer);
  };

  if (!startGame) return <Countdown startGame={startMainGame} />;
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
                <span>Question {currentQuestionIndex + 1}</span>/
                {questions.length}
              </div>
              <div className="questions__display">
                {currentQuestion.questionText}?
              </div>

              <div>
                {currentQuestion.answerOptions.map((answerOption, index) => (
                  <div key={index} className="answer-item">
                    <AnswerButton
                      answerOption={answerOption}
                      isCorrectAnswer={answerOption === currentQuestion.answer}
                      isSelectedAnswer={answerOption === selectedAnswer}
                      revealAnswers={revealAnswers}
                      handleAnswerClick={handleAnswerClick}
                      index={index}
                      indexx={indexx}
                      flash={flash}
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
              <h3 className="question-splash-header">
                {lives === 0
                  ? "Oops! You've lost all lives"
                  : "Congratulations!!"}
              </h3>
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
                      {questions.length - score}
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

              <button onClick={resetQuiz} className="btn startGame">
                Play again
              </button>

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
          <LostLife close={() => setGameModal(false)} lives={lives} />
        )}
      </div>
    );
};

/******* ANSWER BUTTON COMPONENT ********/
const AnswerButton = ({
  answerOption,
  isCorrectAnswer,
  isSelectedAnswer,
  revealAnswers,
  index,
  indexx,
  handleAnswerClick,
  flash,
}) => {
  let backgroundColor;
  let icon;

  if (revealAnswers && isCorrectAnswer) {
    backgroundColor = "#2f922f";
    icon = faCheckCircle;
  } else if (!revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else {
    icon = faCircleRegular;
  }

  return (
    <div
      className={`questions__options  ${isSelectedAnswer && flash && "flash"}`}
      style={{ backgroundColor: backgroundColor, color: "white" }}
      onClick={() => handleAnswerClick(index === indexx ? "" : answerOption)}
    >
      <div className="answer__icon">
        <FontAwesomeIcon className="answer-item-circle" icon={icon} />
      </div>
      <span className="answer__option">
        {index === indexx ? "" : answerOption}
      </span>
    </div>
  );
};

export default Question;
