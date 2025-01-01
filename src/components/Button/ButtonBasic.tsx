import React from "react";

type ButtonBasicProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  text?: string;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
  icon?: any;
  bgColor?: string;
};

const ButtonBasic: React.FC<ButtonBasicProps> = ({
  className,
  text,
  type = "button",
  icon,
  bgColor = "bg-emerald-500",
  ...props
}) => {
  return (
    <button
      className={` py-2 px-4 ${bgColor} text-white hover:bg-emerald-700  font-semibold rounded-sm flex gap-x-2 justify-center items-center ${className}`}
      type={type}
      {...props}
    >
      {icon ? icon : null}
      {text ? <span>{text}</span> : null}
    </button>
  );
};

export default ButtonBasic;
