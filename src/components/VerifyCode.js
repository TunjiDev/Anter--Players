import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { IonSpinner } from "@ionic/react";
import { Store, set } from "../context/Store";
const VerifyCode = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [counter, setCounter] = useState(59);
  const [serverError, setServerError] = useState("");
  const [showResend, setShowResend] = useState(true);
  const [resend, setResend] = useState(false);
  const { state } = useContext(Store);
  const history = useHistory();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState("");
  //Using useEffect so it will run at the start
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      setResend(true);
      setShowResend(true);
    }
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    //updating the input with the changed value
    setOtp([...otp.map((d, i) => (i === index ? element.value : d))]);

    //focusing on the next input field
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  useEffect(() => {
    state.user.phoneNumber && setPhoneNo(state.user.phoneNumber);
  }, []);
  const handleFocus = (e) => {
    e.target.select();
    setError(false);
  };
  const resendLogin = () => {
    setShowResend(false);
    setCounter(59);
    setResendLoading(true);
    fetch("https://anter-trivia-game.herokuapp.com/api/v1/user/signup", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: state?.user?.phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res);
        setResendLoading(false);
        if (res.status === 500) {
          throw new Error("Something went wrong! Please try again later");
        }
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setResendError(data.message);
            console.log("data", data);
            throw new Error(data.message);
          });
        }
      })
      .catch((err) => {
        console.log("catch", err);
        setResendLoading(false);
        setResendError(err.message);
      });
  };
  const handleVerify = async (e) => {
    setServerError("");
    setError(false);
    setLoading(true);
    e.preventDefault();
    const code = +otp.join("");
    console.log(code);
    setOtp(new Array(4).fill(""));
    fetch("https://anter-trivia-game.herokuapp.com/api/v1/user/verify", {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setError(true);
            setServerError(data.message);
            console.log(data);
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        set("token", data.token);
        history.push("/chooseusername");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setServerError(err.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="verification-page">
        <div className="verification-page__container">
          <div className="verification-header">
            <h1 className="verify-header">Verification Code</h1>
            <p className="verify-text">
              Please type code sent to{" "}
              <span className="moblileNumber">{phoneNo}</span>
            </p>
          </div>

          <form
            onSubmit={handleVerify}
            className="verification-input"
            action=""
          >
            <div className="verification-input-container">
              {otp.map((data, i) => (
                <input
                  type="text"
                  key={i}
                  required
                  className={`code ${error && "error-boundary"}`}
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, i)}
                  onFocus={handleFocus}
                />
              ))}
            </div>
            <button className="btn splash-screen__btn link-btn">
              {loading ? <IonSpinner name="bubbles" /> : <p>Verify</p>}
            </button>
          </form>
          {serverError && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>{serverError}</p>
          )}
          {resendError && (
            <p style={{ color: "red", fontSize: "1.6rem" }}>{resendError}</p>
          )}
          <p className="verify-text verify-text-2">Didn't receieve a code?</p>
          {(resend && showResend) || resendLoading ? (
            <button className="btn resendButton" onClick={resendLogin}>
              {resendLoading ? <IonSpinner name="bubbles" /> : <p>Resend</p>}
            </button>
          ) : (
            <p className="resend-text">
              Resend Code in{" "}
              <span className="time-count-down">0:{counter}</span>s
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
