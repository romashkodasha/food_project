import * as React from "react";
import { IconProps } from "../Icon";

const ArrowRightIcon: React.FC<IconProps> = ({
  width,
  height,
  color,
  left
}) => {
  let customColor;
  if (width === undefined) {
    width = 32;
  }
  if (height === undefined) {
    height = 32;
  }
  if (color === "accent") {
    customColor = "var(--text-accent)";
  }
  if (color === "secondary") {
    customColor = "var(--text-secondary)";
  }
  if (color === "primary") {
    customColor = "var(--text-primary)";
  }


  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d={left? "M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994":"M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"}
        stroke={color === undefined ? "currentColor" : customColor}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowRightIcon;
