import React, { ReactNode, useState } from "react";
import { FiX } from "react-icons/fi";

type Props = {
  size?: string;
  color: string;
  outlined?: boolean;
  raised?: boolean;
  rounded?: boolean;
  borderLeft?: boolean;
  icon?: ReactNode;
  closeDisabled?: boolean;
  children: ReactNode;
  className: string;
};

export default ({
  size = "default",
  color,
  outlined = false,
  raised = false,
  rounded = false,
  borderLeft = false,
  icon,
  closeDisabled = false,
  children,
  className = "",
}: Props) => {
  const [hidden, setHidden] = useState(false);

  const css: string[] = [];
  let cssString = "";

  css.push(color);
  if (outlined) css.push(`border border-current`);
  if (raised) css.push("shadow");
  if (rounded) css.push("rounded-lg");
  if (hidden) css.push("hidden");
  if (borderLeft) css.push("border-l-4 border-current");
  if (size === "sm") {
    css.push("p-2");
  } else {
    css.push("p-4");
  }
  if (className) {
    css.push(className);
  }

  cssString = css.join(" ");

  return (
    <div className={`w-full flex ${cssString.includes("items-") ? "" : "items-center"} justify-start p-4 ${cssString}`}>
      <div className="flex-shrink">{icon}</div>
      <div className="flex-grow">{children}</div>
      {!closeDisabled && (
        <div className="flex-shrink">
          <button onClick={() => setHidden(!hidden)} className="flex items-center justify-center ml-auto">
            <FiX className="w-4 h-4 stroke-current" />
          </button>
        </div>
      )}
    </div>
  );
};
