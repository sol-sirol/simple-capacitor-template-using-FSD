import { CSSProperties, HTMLAttributes, useState } from "react";
import { SkeletonBlock } from "skeleton-elements/react";

import classNames from "./style.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  imageClassName?: string;
  imageStyle?: CSSProperties;
  backgroundColor?: string;
  height?: string | number;
  width?: string | number;
  size?: CSSProperties["objectFit"];
  image?: string;
  onLoad?: () => void;
}

export const Image = ({
  imageClassName,
  width,
  height,
  image,
  size = "cover",
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
        <img
          alt=""
          src={image}
          onLoad={onLoad}
          className={imageClassName}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: backgroundColor,
            objectFit: size,
            ...imageStyle,
          }}
        />
      )}
    </div>
  );
};
