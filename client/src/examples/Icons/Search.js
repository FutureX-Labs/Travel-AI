import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Search({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="5.14764" cy="5" r="4.3" stroke="white" strokeWidth="1.4" fill="#37393E" />
      <line
        x1="10.1577"
        y1="11"
        x2="8.14764"
        y2="8.98995"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Setting default values for the props of Office
Search.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Search.propTypes = {
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

export default Search;
