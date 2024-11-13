import LogoText from "../assets/logo-text.svg";
import { Box } from "@mui/system";
import { animated, config, useSpring, useTrail } from "@react-spring/web";

const Logo = () => {
  const [springs, api] = useTrail(
    3,
    () => ({
      from: { x: -1000 },
      to: { x: 0 },
      config: {
        ...config.gentle,
        friction: 16,
      },
      delay: 500,
    }),
    [],
  );

  const [props] = useSpring(
    () => ({
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 },
      delay: 0,
      config: config.gentle,
    }),
    [],
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <Box display={"flex"}>
        <svg
          width="256"
          viewBox="0 0 191 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: "visible",
          }}
        >
          <animated.path
            style={springs[2]}
            d="M28.3704 6.24689C29.937 3.74022 33.5877 3.74022 35.1543 6.24689L59.6997 45.5195C61.3648 48.1837 59.4495 51.6395 56.3077 51.6395H7.217C4.07526 51.6395 2.15988 48.1837 3.825 45.5195L28.3704 6.24689Z"
            fill="#00008F"
          />
          <animated.g style={springs[1]}>
            <path
              d="M72.8073 20.0514C70.3976 17.6417 70.3976 13.7348 72.8073 11.3252L78.3251 5.80727C80.7348 3.39758 84.6417 3.39758 87.0514 5.80727L116.31 35.0654C118.719 37.4751 118.719 41.382 116.31 43.7917L110.792 49.3096C108.382 51.7193 104.475 51.7193 102.065 49.3096L72.8073 20.0514Z"
              fill="#00008F"
            />
            <path
              d="M116.31 20.0514C118.719 17.6417 118.719 13.7348 116.31 11.3252L110.792 5.80727C108.382 3.39758 104.475 3.39758 102.066 5.80727L72.8075 35.0654C70.3978 37.4751 70.3978 41.382 72.8075 43.7917L78.3253 49.3096C80.735 51.7193 84.6419 51.7193 87.0516 49.3096L116.31 20.0514Z"
              fill="#00008F"
            />
          </animated.g>
          <animated.path
            style={springs[0]}
            d="M155.421 6.24689C156.987 3.74022 160.638 3.74022 162.205 6.24689L186.75 45.5195C188.415 48.1837 186.5 51.6395 183.358 51.6395H134.267C131.126 51.6395 129.21 48.1837 130.875 45.5195L155.421 6.24689Z"
            fill="#00008F"
          />
        </svg>
      </Box>

      <animated.img src={LogoText} width={512} style={props} />
    </Box>
  );
};

export default Logo;
