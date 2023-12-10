import React, { FC } from "react";
import { Button as F7Button } from "framework7-react";
import { Loader } from "shared/ui/loaders";

type ButtonType = {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  fill?: boolean;
  [key: string]: any;
};

export const Button: FC<ButtonType> = ({
  loading,
  children,
  onClick,
  ...props
}) => {
  const handleClick = () => {
    if (!loading && !props.disabled && onClick) onClick();
  };
  return (
    <F7Button onClick={handleClick} {...props}>
      {loading ? (
        <Loader white={props.fill} size={18} style={{ marginRight: 5 }} />
      ) : (
        children
      )}
    </F7Button>
  );
};

Button.defaultProps = {
  onClick: () => {},
};
