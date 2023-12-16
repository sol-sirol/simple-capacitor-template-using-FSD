import { Image } from "shared/ui/images";

export const ViewerAvatar = () => {
  return (
    <Image
      width={"100px"}
      height={"100px"}
      size="cover"
      image="https://i.pinimg.com/236x/8c/66/40/8c66407bce59584191fba90baf6f2e39.jpg"
      style={{borderRadius: "50%"}}
    ></Image>
  );
};
