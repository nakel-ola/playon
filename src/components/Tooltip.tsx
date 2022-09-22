import { ReactNode, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";

interface Props {
  content?: string | ReactNode;
  children: ReactNode;
  placement?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  visible?: boolean;
  arrow?: boolean;
  onClickOutside?: () => void;
}

const Tooltip = (props: Props) => {
  const {
    content,
    children,
    placement = "top",
    arrow = true,
    visible,
    onClickOutside,
  } = props;

  const ref = useRef<HTMLDivElement>();

  useOnClickOutside(ref, () => visible && onClickOutside?.());

  const isTop =
    placement === "bottom" ||
    placement === "bottom-left" ||
    placement === "bottom-right";
  const isBottom =
    placement === "top" ||
    placement === "top-left" ||
    placement === "top-right";
  const isX = placement === "left" || placement === "right";

  return (
    <div className="relative">
      <div className="relative">{children}</div>
      <div className="absolute">
       {content}
      </div>
    </div>
  );
};

export default Tooltip;
