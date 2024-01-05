import { useState } from "react";
import "./App.scss";
import Dice from "./images/icon-dice.svg";
import Divider_D from "./images/pattern-divider-desktop.svg";
import Divider_M from "./images/pattern-divider-mobile.svg";

function App() {
  const [advice, setAdvice] =
    useState(`It is easy to sit up and take notice, what's difficult is getting up
  and taking action`);
  const [adviceID, setAdviceID] = useState("117");
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("https://api.adviceslip.com/advice");

      if (!response.ok) {
        throw new Error("Failed to fetch advice");
      }

      const data = await response.json();
      const adviceID = data.slip.id;
      const advice = data.slip.advice;

      setAdviceID(adviceID);
      setAdvice(advice);
    } catch (error) {
      console.error("Error fetching advice:", error);
      setAdviceID("--");
      setAdvice("You are offline!, LET'S NOT WANDER WHERE THE WIFI IS WEAK");
    } finally {
      setLoading(false);
    }
  };

  function handleClick() {
    fetchData();
  }

  return (
    <>
      <main className="main">
        <blockquote className="blockquote__container">
          <cite className="advice__id">
            Advice <span className="id">{`#${adviceID}`}</span>
          </cite>
          <p className="quote">{advice}</p>
        </blockquote>
        <picture className="divider__image">
          <source media="(min-width: 64rem)" srcSet={Divider_D} />
          <img src={Divider_M} alt="" />
        </picture>
        <div className={loading ? "dice load" : "dice"} onClick={handleClick}>
          <img src={Dice} alt="" />
        </div>
      </main>
    </>
  );
}

export default App;
