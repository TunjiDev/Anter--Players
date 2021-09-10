import { createContext, useReducer, useState, useRef } from "react";
import { useHistory } from "react-router";
import { Storage } from "@capacitor/storage";
import { convertTime } from "../Helpers/Functions";

export const Store = createContext();
let phoneNum;
let interval = useRef;
const user = "user";
const initialState = {
  user: {
    phoneNumber: phoneNum ? phoneNum : "",
  },
  Token: "",
  userDetails: {},
  currentLiveGame: {},
  allLiveGames: [],
  reload: false,

  Questions: [
    {
      questionText: "What is the capital of Ireland",
      answerOptions: ["New York", "Dublin", "Madrid", "Paris"],
      answer: "Dublin",
      difficulty: "easy",
    },
    {
      questionText: "Luke Skywalker is a character from which film series",
      answerOptions: [
        "The Lion King",
        "Harry Potter",
        "Star Wars",
        "Lord of the Rings",
      ],
      answer: "Star Wars",
      difficulty: "easy",
    },
    {
      questionText: "What is the color of the sky?",
      answerOptions: ["blue", "yellow", "green", "white"],
      answer: "blue",
      difficulty: "easy",
    },
    {
      questionText: "Whih of the following is not a phone brand?",
      answerOptions: ["Tecno", "Sunshine", "iphone", "Samsung"],
      answer: "Sunshine",
      difficulty: "easy",
    },
    {
      questionText: "How many days are in September",
      answerOptions: ["28", "29", "30", "31"],
      answer: "30",
      difficulty: "average",
    },
    {
      questionText: "What is the house number of the Simpsons?",
      answerOptions: ["1", "64", "742", "0"],
      answer: "742",
      difficulty: "average",
    },
    {
      questionText:
        "What is the name of the actor who played 'Fiona' in 'Shrek'?",
      answerOptions: [
        "Sofia Vergara",
        "Cameron Diaz",
        "Gina Torres",
        "Jennifer Lopez",
      ],
      answer: "Cameron Diaz",
      difficulty: "average",
    },
    {
      questionText: "Which of these is not a planet?",
      answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
      answer: "Florida",
      difficulty: "hard",
    },
    {
      questionText: "Which of these is not a planet22?",
      answerOptions: ["Earth", "Jupitor", "Mars", "Florida1"],
      answer: "Florida1",
      difficulty: "hard",
    },
    {
      questionText: "Which of these is not a planet33?",
      answerOptions: ["Earth2", "Jupitor", "Mars", "Florida"],
      answer: "Earth2",
      difficulty: "hard",
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "ADDINFO":
      return { ...state, userDetails: action.payload };
    case "LOGOUT":
      return { user: null };
    case "GETQUESTIONS":
      return { ...state, Questions: action.payload };
    case "GETTOKEN":
      return { ...state, Token: action.payload };
    case "ADDCURRENTLIVEGAME":
      return { ...state, currentLiveGame: action.payload };
    case "ADDALLLIVEGAME":
      return { ...state, allLiveGames: action.payload };
    case "RELOADHOMEPAGE":
      return { ...state, reload: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, initialState);
  const gameZoneEndPoint = (id) => {
    const token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;
    fetch(
      ` https://anter-trivia-game.herokuapp.com/api/v1/user/gamezone/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "from gamezone endpoint");
      })
      .catch((err) => console.log(err));
  };

  const redirectToGameZone = () => {
    console.log(state.userDetails, "from store");
    state.userDetails.activeGames?.forEach((activeGame) => {
      const { year, month, day, hour, minute, seconds } =
        convertTime(activeGame);
      const countDownTime = new Date(
        +year,
        +month,
        +day,
        +hour,
        +minute,
        +seconds,
        +seconds
      ).getTime();

      console.log("calling everytime");
      const now = new Date().getTime();
      let differenceInTimes = countDownTime - now;
      const hours = Math.floor(
        (differenceInTimes % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (differenceInTimes % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds2 = Math.floor((differenceInTimes % (1000 * 60)) / 1000);

      if (hours === 0 && minutes === 2 && seconds2 === 0) {
        history.push(`live-participants/${activeGame.categoryId}`);
        gameZoneEndPoint(activeGame.categoryId);
      } else {
        console.log("did not work");
      }
    });
  };

  const value = { state, dispatch, redirectToGameZone };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

export async function set(key, value) {
  await Storage.set({
    key: key,
    value: JSON.stringify(value),
  });
}
export async function get(key) {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}
export async function remove(key) {
  await Storage.remove({
    key: key,
  });
}

export const getNumber = async () => {
  const phoneNo = await get("userNumber");
  phoneNum = await phoneNo;
  return phoneNo;
};
