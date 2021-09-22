import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import countryTelData from "country-telephone-data";
import { IonSpinner } from "@ionic/react";
import { Store } from "../context/Store";
import { set } from "../context/Store";
const Login = () => {
  const { dispatch } = useContext(Store);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [error, setError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [serverError, setServerError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectErrorMessage, setselectErrorMessage] = useState("");
  const [inputErrorMessage, setinputErrorMessage] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    setError(false);
    setSelectError(false);
    setLoading(true);
    setServerError("");
    const phoneNo = `${country}${phoneNumber}`;

    dispatch({ type: "LOGIN", payload: { phoneNumber: phoneNo } });
    set("userNumber", phoneNo);
    if (country === "") {
      setSelectError(true);
      setselectErrorMessage("Country code must not be empty");
      setLoading(false);
      return;
    }

    if (phoneNumber === "") {
      setError(true);
      setinputErrorMessage("Phone number must not be empty");
      setLoading(false);
      return;
    }
    // if(phoneNumber.split(' ').length <8){
    //   setinputErrorMessage('Invalid Phone Number.')
    //   return
    // }
    fetch("https://anter-trivia-game.herokuapp.com/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: phoneNo,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res);

        setLoading(false);
        if (!res) {
          throw new Error(
            "Slow network! Please check your network and try again"
          );
        }
        if (res.status === 500) {
          throw new Error("Something went wrong! Please try again later");
        }
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setServerError(data.message);
            console.log("data", data);
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        history.push("/verifycode");
      })
      .catch((err) => {
        console.log("catch", "Something went wrong");
        setLoading(false);
        setServerError(err.message);
      });
  };
  return (
    <div>
      <div className="verification-page">
        <div className="verification-page__container">
          <div className="verification-header">
            <h1 className="verify-header">Verify your phone number</h1>
            {/* <p className="verify-text">
              Provide your phone number so we can be able to send you
              confirmation code.
            </p> */}
          </div>
          <div action="" className="verification-page__phone">
            <label htmlFor="phone">Enter Phone Number</label>
            <form
              onSubmit={loginHandler}
              className="verification-page__phone__container"
            >
              <select
                onFocus={() => setSelectError(false)}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`verification-page__select ${
                  selectError && "error-boundary"
                }`}
                name=""
                id=""
              >
                <option className="option" value="">
                  {" "}
                  Country
                </option>
                <option className="option" value={"+234"}>
                  {" "}
                  +234 Nigeria
                </option>
                {countryTelData.allCountries.map((country) => (
                  <option
                    key={country.name}
                    className="option"
                    value={country.dialCode}
                  >
                    +{country.dialCode} {country.name.split(" ")[0]}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                name="phone"
                id="phone"
                onFocus={() => setError(false)}
                className={`verification-page__input ${
                  error && "error-boundary"
                }`}
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <button
                className="btn splash-screen__btn link-btn"
                onClick={loginHandler}
              >
                {loading ? <IonSpinner name="bubbles" /> : <p>Continue</p>}
              </button>
            </form>
          </div>
          {error && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>
              {inputErrorMessage}
            </p>
          )}
          {selectError && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>
              {selectErrorMessage}
            </p>
          )}
          {serverError && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>{serverError}</p>
          )}
          <p className="verify-text verify-text-2">
            By proceeding, you are indicating that you agree to the{" "}
            <a href="/termsansconditions" className="option-link">
              terms and condition
            </a>{" "}
            of the game
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
