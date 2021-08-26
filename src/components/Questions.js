import { useState, useEffect, useContext } from "react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "./NavLink";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { Store } from "../context/Store";
const Question = () => {
  const history = useHistory();
  const TIMER_START_VALUE = 10;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealAnswers, setRevealAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIMER_START_VALUE);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [hideOption, setHideOption] = useState(false);
  const [newOptions, setNewOptions] = useState();
  const [low, setLow] = useState(false);
  const [start, setStart] = useState(false);
  const { state } = useContext(Store);
  const [stage, setStage] = useState(2);
  const [difficultyLevel, setDifficultyLevel] = useState("Easy");
  const [apiQuestions, setApiQuestions] = useState([state.Questions]);
  const [indexx,setIndex] = useState()

  const [questions, setQuestions] = useState(state.Questions.easy);
   let t1;
  useEffect(() => {
    updateTimer();
    if (timer < 5) {
      setLow(true);
    }
    return () => {
      clearTimeout(t1);
    };
  }, [timer]);

  const currentQuestion = questions[currentQuestionIndex];
  const updateTimer = () => {
    if (!revealAnswers && timer > 0) {
    t1=  setTimeout(() => setTimer(timer - 1), 1000);
    } else {
      setRevealAnswers(true);
    }
  };

  const handleNextQuestionClick = () => {
    setRevealAnswers(false);
    setLow(false);
    setHideOption(false);
    setIndex(null)
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimer(TIMER_START_VALUE);
    currentQuestionIndex > questions.length && setStage(stage + 1);
  };

  const resetQuiz = () => {
    clearTimeout(t1);
    setTimer(TIMER_START_VALUE);
    setRevealAnswers(false);
    setStage(stage + 1);
    setCurrentQuestionIndex(0);
    setScore(0);
    console.log(stage);
    stage === 2 && setQuestions(state.Questions.average);
    stage === 3 && setQuestions(state.Questions.difficult);
    console.log(difficultyLevel);
  };

  const handleAnswerClick = (selectedAnswer) => {
    if (revealAnswers) {
      return;
    }
    setSelectedAnswer(selectedAnswer);

    if (selectedAnswer === currentQuestion.answer) {
      setScore(score + 1);
    }
    setRevealAnswers(true);
  };

  const handleHide = () => {
    setHideOption(true);
    const index = Math.floor(Math.random() * 2);
   
   
    const wrongAnswer = currentQuestion.answerOptions.findIndex(
      (option) => option !== currentQuestion.answer
    );
    setIndex(wrongAnswer)
    const rightAnswer = currentQuestion.answerOptions.find(
      (option) => option === currentQuestion.answer
    );
    console.log(wrongAnswer)
    // wrongAnswers.splice(index, 1);
    // console.log(rightAnswer);
    // setNewOptions([...wrongAnswers, rightAnswer]);
  };

  return (
    <div className="questions__container" style={{ color: "white" }}>
      <Header handleHide={handleHide} />

      {currentQuestionIndex < questions.length ? (
        <div className="questions__QandA">
          <div className="questions__timer">
            <span className="timer">{timer}</span>
          </div>
          {/* <div className="timer-wrapper">
            <div
              className={`timer-countdown-bar ${low && "red"}`}
              style={{ width: (timer / TIMER_START_VALUE) * 100 + "%" }}
            ></div>
          </div> */}
          <div className="question-count">
            <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
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
                  />
                </div>
              ))}
            </div>
          
          

          {revealAnswers && (
            <button onClick={handleNextQuestionClick} className="btn next-btn">
              Next
            </button>
          )}
        </div>
      ) : (
        <div>
          <div className="questions__result">
            <h3 className="question-splash-header">Result</h3>
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
                  </span>{" "}
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
                  <span className="coins-earned">7</span>
                </div>
              </div>
            </div>

            <button onClick={resetQuiz} className="btn startGame">
              Start The Next Game
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
}) => {
  let backgroundColor;
  let icon;

  if (revealAnswers && isCorrectAnswer) {
    backgroundColor = "#2f922f";
    icon = faCheckCircle;
  } else if (revealAnswers && isSelectedAnswer) {
    backgroundColor = "#ff3333";
    icon = faTimesCircle;
  } else {
    icon = faCircleRegular;
  }

  return (
    <div
      className={`questions__options ${index===indexx? 'hide':null}`}
      style={{ backgroundColor: backgroundColor, color: "white" }}
      onClick={() => handleAnswerClick(answerOption)}
    >
      <FontAwesomeIcon className="answer-item-circle" icon={icon} />

      {answerOption}
    </div>
  );
};

export default Question;
