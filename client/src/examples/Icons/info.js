import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Info({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 21 20"
      fill={colors[color] ? colors[color].main : colors.dark.main}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.68097 5H11.6414V7H9.68097V5ZM10.6612 15C11.2003 15 11.6414 14.55 11.6414 14V10C11.6414 9.45 11.2003 9 10.6612 9C10.1221 9 9.68097 9.45 9.68097 10V14C9.68097 14.55 10.1221 15 10.6612 15ZM10.6612 0C5.25035 0 0.858948 4.48 0.858948 10C0.858948 15.52 5.25035 20 10.6612 20C16.072 20 20.4634 15.52 20.4634 10C20.4634 4.48 16.072 0 10.6612 0ZM10.6612 18C6.3384 18 2.8194 14.41 2.8194 10C2.8194 5.59 6.3384 2 10.6612 2C14.984 2 18.503 5.59 18.503 10C18.503 14.41 14.984 18 10.6612 18Z"
        fill="white"
      />
    </svg>
  );
}

// Setting default values for the props of Office
Info.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Info.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
    "white",
  ]),
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Info;
