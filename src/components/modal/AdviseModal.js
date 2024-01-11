import { useEffect, useState } from "react";
import "./css/AdviseModal.css";

function AdviseModal(props) {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(1);

  function closeHandler() {
    props.close();
  }

  async function getAdvice() {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");

      const data = await res.json();
      return data.slip.advice;
      // setAdvice();
    } catch (err) {
      console.err("err", err);
      return err;
    }
  }

  useEffect(() => {
    getAdvice().then((data) => {
      setAdvice(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="AdviseCard">
      <p>{isLoading ? "loading..." : advice}</p>
      <button className="AdviseCardButton " onClick={closeHandler}>
        Confirm
      </button>
    </div>
  );
}

export default AdviseModal;
