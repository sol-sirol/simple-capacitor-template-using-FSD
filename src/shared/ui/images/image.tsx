import React, { useState } from "react";
import { SkeletonBlock } from "skeleton-elements/react";
import classNames from "./style.module.css";

type Props = {
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  onLoad?: () => void;
  height?: string | number;
  width?: string | number;
  fillColor?: string;
  className?: string;
  size?: string;
  image?: string;
  backgroundColor?: string;
  imageClassName?: string;
  loader?: boolean;
  children?: React.ReactNode;
};

export const Image = (props: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const onLoad = () => {
    setLoaded(true);
    if (props.onLoad) {
      props.onLoad();
    }
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    if (props.onClick) props.onClick(e);
  };

  const {
    className,
    imageClassName,
    width,
    height,
    image,
    size,
    style,
    imageStyle,
    backgroundColor,
    loader,
  } = props;
  return (
    <div
      {...props}
      onClick={onClick}
      className={className}
      style={{
        position: "relative",
        width,
        height,
        ...style,
        overflow: "hidden",
      }}
    >
      {!loaded && (
        <div style={{ backgroundColor }} className={classNames.placeholder}>
          {loader && (
            <SkeletonBlock
              //@ts-ignore
              width={width}
              //@ts-ignore
              height={height}
              effect="blink"
              style={{ position: "relative", ...imageStyle }}
            />
          )}
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