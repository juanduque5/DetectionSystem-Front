import React from "react";
//import '../FaceRecognition/FaceRecognition.css';

const ImageLinkForm = ({ onInputChange, onSubmit, onDelete }) => {
  //onClick delete calls this functions and this funtion calls onDelete(), which is at App.js
  const deleteText = () => {
    const input = document.getElementById("myInput");
    input.value = "";
    onDelete();
  };

  return (
    <div>
      <p className="f3">
        This Magic Brain will detect <strong>up to 3</strong> clothing and
        fashion-related concepts such as jewelry, hats, etc.
      </p>

      <div className="center">
        <div className="center mb3 pa4 br3 shadow-5">
          <input
            id="myInput"
            className="f4 pa2 w-70 center"
            placeholder="Image URL"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 ma1 grow f4 link ph3 pv2 dib white bg-black"
            onClick={onSubmit}
          >
            {" "}
            Detect{" "}
          </button>
          <button
            className="w-30 ma1 grow f4 link ph3 pv2 dib white bg-red"
            onClick={deleteText}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
