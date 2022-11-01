import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {

  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      onClick={props.onClick} //onClick eventHandler attribute is = onClick??
      className={buttonClass} 
      disabled={props.disabled} //same.. is it just, disabled = true?
    >
      {props.children}
    </button>
  );
}