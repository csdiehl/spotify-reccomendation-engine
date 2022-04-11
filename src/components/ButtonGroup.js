import classes from "./ButtonGroup.module.css";
import { useState } from "react";

const ButtonGroup = (props) => {
  const [clicked, setClicked] = useState("medium");

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

  const showBtnHandler = (setting) => {
    props.showBtn(setting)
  }

  return (
    <div className= {classes['main-container']}>
      <div>
        <p className = {props.enabled ? classes['label-clicked'] : classes['btn-label'] } onClick = {() => showBtnHandler(props.setting) }>{props.setting}</p>
      </div>
        {props.enabled && buttonSet}
    </div>
  );
};

export default ButtonGroup;
