import { createContext, useReducer, useState } from "react";
import { Storage } from "@capacitor/storage";
export const Store = createContext();
let phoneNum;
const user = "user";
const initialState = {
  user: {
    phoneNumber: phoneNum ? phoneNum : "",
  },
  Token: "",
  userDetails: {},
  currentLiveGame: {},
  allLiveGames: [],

  Questions: {
    easy: [
      {
        questionText: "What is the capital of Ireland",
        answerOptions: ["New York", "Dublin", "Madrid", "Paris"],
        answer: "Dublin",
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
      },
      {
        questionText: "What is the color of the sky?",
        answerOptions: ["blue", "yellow", "green", "white"],
        answer: "blue",
      },
      {
        questionText: "Whih of the following is not a phone brand?",
        answerOptions: ["Tecno", "Sunshine", "iphone", "Samsung"],
        answer: "Sunshine",
      },
    ],

    average: [
      {
        questionText: "How many days are in September",
        answerOptions: ["28", "29", "30", "31"],
        answer: "30",
      },
      {
        questionText: "What is the house number of the Simpsons?",
        answerOptions: ["1", "64", "742", "0"],
        answer: "742",
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
      },
    ],

    difficult: [
      {
        questionText: "Which of these is not a planet?",
        answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
        answer: "Florida",
      },
      {
        questionText: "Which of these is not a planet22?",
        answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
        answer: "Florida",
      },
      {
        questionText: "Which of these is not a planet33?",
        answerOptions: ["Earth", "Jupitor", "Mars", "Florida"],
        answer: "Florida",
      },
    ],
  },
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
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = { state, dispatch };

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
