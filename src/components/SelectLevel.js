import { useHistory } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { IonSpinner } from "@ionic/react";
import { Store, get } from "../context/Store";
import "./style2.css";

const SelectLevel = () => {
  const { dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  // const fetchQuestions=async(e)=>{
  //     e.preventDefault()
  //       setLoading(true)
  //       const token =await get('token')
  //       const config=   {
  //           headers:{Authorization:`Bearer ${token}`  }

  //      }
  //   try{  const {data} = await axios.get('https://anter-trivia-game.herokuapp.com/api/v1/user/questions', config)
  //      if(data){
  //          setLoading(false)
  //         dispatch({type:'GETQUESTIONS', payload:data.data.questions})
  //         console.log(Object.values(data.data.questions[0].options[0]).slice(1,4))
  //         // history.push('/question')
  //      }

  // }
  //   catch(err){
  //       console.log(err)
  //       setLoading(false)
  //   }
  // }

  const history = useHistory();
  return (
    <div className="questions" style={{ color: "white" }}>
      <form action="" className="questions__select">
        <label htmlFor="select">
          <h3 className="question-spash-header">Select Difficulty Level</h3>
        </label>
        <select
          style={{ backgroundColor: "white" }}
          className="questions__select-difficulty"
          name="select"
          id="select"
        >
          <option value="Easy" className="levels">
            Easy
          </option>
          <option value="Normal" className="levels">
            Normal
          </option>
          <option value="Hard" className="levels">
            Hard
          </option>
        </select>
        <button
          className="btn select-btn"
          onClick={() => history.push("/question")}
        >
          {loading ? <IonSpinner name="bubbles" /> : <p>Continue</p>}
        </button>
      </form>
    </div>
  );
};

export default SelectLevel;
