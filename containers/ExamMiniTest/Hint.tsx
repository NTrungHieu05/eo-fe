import React, { useState } from 'react';

export default function Hint(props) {
  const [show, setShow] = useState(true);

  return (
    <div className="game-object-explanation quiz-explanation">
      <div className="quiz-explanation-button-wrap">
        <button
          className="MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButtonBase-root quiz-explanation-button default css-10dzm3y"
          tabIndex={0}
          type="button"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? 'Hide' : 'Show'} Explanation
          <span className="MuiTouchRipple-root css-w0pj6f" />
        </button>
      </div>
      {show && (
        <div className="game-object-main-explanation">
          <div
            className="game-object-explanation-content"
            dangerouslySetInnerHTML={{ __html: props.hint }}
          ></div>
        </div>
      )}
    </div>
  );
}
