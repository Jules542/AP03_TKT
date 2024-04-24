import React from "react";

const Buttons = () => {
  return <div>Buttons</div>;
};

const CloseButton = ({
  someFunction,
  className = "button__close",
  children,
}) => {
  return (
    <a onClick={someFunction} className={className}>
      {children}
    </a>
  );
};

export default CloseButton;
