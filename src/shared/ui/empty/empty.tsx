import React from "react";

type Props = {
  style: React.CSSProperties;
  text?: string;
  className?: string;
  [key: string]: any;
};

export const Empty = ({ style, text, className, ...props }: Props) => {
  return (
    <div
      style={{ width: "100%", height: "100%", ...style }}
      className={`display-flex justify-content-center align-items-center ${className}`}
      {...props}
    >
      {text}
    </div>
  );
};

Empty.defaultProps = {
  style: {},
  text: "Список пуст",
  className: "",
};
