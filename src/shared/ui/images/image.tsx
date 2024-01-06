import React, { HTMLAttributes, useState } from "react";
import { SkeletonBlock } from "skeleton-elements/react";

import classNames from "./style.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  imageStyle?: React.CSSProperties;
  onLoad?: () => void;
  height?: string | number;
  width?: string | number;
  size?: string;
  image?: string;
  backgroundColor?: string;
  imageClassName?: string;
}

export const Image = ({
  imageClassName,
  width,
  height,
  image,
  size,
  style,
  imageStyle,
  backgroundColor,
  ...props
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const onLoad = () => {
    setLoaded(true);
    if (props.onLoad) {
      props.onLoad();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        ...style,
        overflow: "hidden",
      }}
      {...props}
    >
      {!loaded && (
        <div style={{ backgroundColor }} className={classNames.placeholder}>
          <SkeletonBlock
            width={"100%"}
            height={"100%"}
            effect="blink"
            style={{ position: "relative", ...imageStyle }}
            tag="div"
            borderRadius="0px"
          />
        </div>
      )}
      {image && (
        <React.Fragment>
          <div
            className={`${classNames.image} ${
              !loaded && image ? classNames.loading : ""
            } ${imageClassName}`}
            style={{
              backgroundSize: size,
              backgroundImage: `url(${image})`,
              backgroundColor,
              ...imageStyle,
            }}
          >
            {props.children}
          </div>
          <img alt="" src={image} onLoad={onLoad} style={{ display: "none" }} />
        </React.Fragment>
      )}
    </div>
  );
};
