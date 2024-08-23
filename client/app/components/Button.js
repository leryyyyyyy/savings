// Button.js
import React from "react";

const Button = ({
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  children,
}) => {
  const baseStyles = "font-bold rounded-lg";

  const variantStyles = {
    primary: "primary-button hover:primary-button-hover",
    paid: "paid-button hover:paid-button-hover",
    delayed: "delayed-button hover:delayed-button-hover",
    warning: "warning-button hover:warning-button-hover",
  };

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button type={type} onClick={onClick} className={buttonStyles}>
      {children}
    </button>
  );
};

export default Button;
