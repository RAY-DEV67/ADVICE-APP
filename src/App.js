import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import img1 from "./images/icon-dice.svg";
import pause from "./images/pattern-divider-desktop.svg";
import Spinner from "react-bootstrap/Spinner";
import twitter from "./images/twitter.svg";

function App() {
  const [id, setid] = useState(0);
  const [advice, setadvice] = useState("");
  const [loading, setloading] = useState(false);

  function showID() {
    Axios.get("https://api.adviceslip.com/advice").then((res) => {
      setid(res.data.slip.id);
    });
  }
  const showadvice = async () => {
    try {
      Axios.get("https://api.adviceslip.com/advice").then((res) => {
        setadvice(res.data.slip.advice);
        setloading(true);
      });
    } catch (e) {
      console.log(e);
    }
  };

  function changeadvice() {
    showadvice();
  }

  function changeid() {
    showID();
  }

  useEffect(() => {
    showID();
    showadvice();
  }, []);

  // window.open(tweetUrl);
  console.log({advice})

  return (
    <div className="App">
      <div className="contain" id="quote-box">
        <p className="id" id="author">
          Advice # {id}
        </p>
        <div className="spin">
          {loading ? (
            <h1 className="head" id="text">
              "{advice}"
            </h1>
          ) : (
            <Spinner className="spinner" animation="border" />
          )}
          <img className="divider" src={pause} alt="img" />
        </div>
        <div
          className="dice"
          onClick={() => {
            changeid();
            setloading(false);
            changeadvice();
          }}
        >
          <button id="new-quote">
            <img className="diceimg" src={img1} alt="img" />
          </button>
        </div>
        <a href={`https://twitter.com/intent/tweet?text=${
    advice}`} target="_blank" id="new-quote">
          <img className="twitter" src={twitter} alt="img" />
        </a>
      </div>
    </div>
  );
}
// onClick={tweetAdvice()}
;

export default App;
