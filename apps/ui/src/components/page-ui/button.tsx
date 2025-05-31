import type { JSX } from "react/jsx-runtime";

interface ButtonProps {
  classes?: string;
  buttonType?: "button" | "reset" | "submit";
  text: string | JSX.Element;
  [otherProp: string]: unknown;
}

export const Button = ({
  buttonType = "button",
  text,
  classes,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button type={buttonType} {...rest} className={classes}>
      {text}
    </button>
  );
};
