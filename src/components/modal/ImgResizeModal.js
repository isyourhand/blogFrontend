import { useRef, useState } from "react";
import "./css/AdviseModal.css";

function ImgResizeModal(props) {
  const close = props.close;
  const img = props.img;

  const resizeImg = props.resizeImg;

  const heightRef = useRef();
  const widthRef = useRef();
  const [height, setHeight] = useState(img.height);
  const [width, setWidth] = useState(img.width);

  return (
    <div className="AdviseCard">
      <label>
        Height:
        <input
          type="range"
          ref={heightRef}
          min="50"
          max="600"
          value={height}
          id="slider"
          name="slider"
          onChange={(e) => {
            setHeight(parseInt(e.target.value, 10));
            resizeImg(img, heightRef.current.value, widthRef.current.value);
          }}
        ></input>
      </label>
      <label>
        Width:
        <input
          type="range"
          id="slider"
          name="slider"
          ref={widthRef}
          min="50"
          max="600"
          value={width}
          onChange={(e) => {
            setWidth(parseInt(e.target.value, 10));
            resizeImg(img, heightRef.current.value, widthRef.current.value);
          }}
        ></input>
      </label>
      <button
        className="AdviseCardButton "
        onClick={(e) => {
          e.preventDefault();
          close();
        }}
      >
        Confirm
      </button>
    </div>
  );
}

export default ImgResizeModal;
