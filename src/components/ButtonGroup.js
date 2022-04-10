import classes from "./ButtonGroup.module.css";
import { useState } from "react";

const ButtonGroup = (props) => {
  const [clicked, setClicked] = useState("medium");
  const [showButtons, setShowButtons] = useState(false)

  const clickHandler = (event) => {
    event.preventDefault();
    setClicked(event.target.value);
    props.setValue(props.setting, event.target.value);
  };

  const buttons = ["low", "medium", "high"];

  const buttonSet = buttons.map((label, i) => (
    <button
      key={i}
      value={label}
      onClick={clickHandler}
      className={label === clicked ?  `${classes.button} ${classes.clicked}`: classes.button }
    >
      {label}
    </button>
  ))

  return (
    <div className= {classes['main-container']}>
      <div>
        <p className = {showButtons ? classes['label-clicked'] : classes['btn-label'] } onClick = {() => setShowButtons(prevState => !prevState)}>{props.setting}</p>
      </div>
      <div className = {classes['btn-container']}>
        {showButtons && buttonSet}
      </div>
    </div>
  );
};

export default ButtonGroup;
