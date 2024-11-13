import Spinner from "../assets/Spinner.svg?react";
import { animated, useSpring } from "@react-spring/web";

const AnimatedSpinner = animated(Spinner);

const Loader = ({}) => {
  const style = useSpring({
    from: {
      transform: "rotateZ(0deg)",
    },
    to: {
      transform: "rotateZ(360deg)",
    },
    config: {
      duration: 1000,
    },
    loop: true,
  });

  return (
    <AnimatedSpinner
      style={{
        ...style,
        height: 74,
      }}
    />
  );
};

export default Loader;
