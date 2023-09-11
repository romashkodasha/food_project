import * as React from "react";
import { IconProps } from "../Icon";

const ArrowDownIcon: React.FC<IconProps> = ({
  width,
  height,
  color,
  className,
  ...props
}) => {
  let customColor;
  if (width === undefined) {
    width = 24;
  }
  if (height === undefined) {
    height = 24;
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
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={color === undefined ? "currentColor" : customColor}
      className={className}
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.33563 8.74741L3.66436 7.25259L12 14.662L20.3356 7.25259L21.6644 8.74741L12 17.338L2.33563 8.74741Z"
        fill={color === undefined ? "currentColor" : customColor}
      />
    </svg>
  );
};

export default ArrowDownIcon;
