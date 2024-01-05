import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const Empty = ({ text = "Список пуст", className, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        "w-full h-full flex justify-center items-center",
        className,
      )}
      {...props}
    >
      {text}
    </div>
  );
};
