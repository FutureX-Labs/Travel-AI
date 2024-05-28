import PropTypes from "prop-types";

import colors from "assets/theme/base/colors";

function Home({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 17"
      fill={colors[color] ? colors[color].main : colors.dark.main}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.99998 16V11H12V16C12 16.55 12.45 17 13 17H16C16.55 17 17 16.55 17 16V8.99997H18.7C19.16 8.99997 19.38 8.42997 19.03 8.12997L10.67 0.599971C10.29 0.259971 9.70998 0.259971 9.32998 0.599971L0.969976 8.12997C0.629976 8.42997 0.839976 8.99997 1.29998 8.99997H2.99998V16C2.99998 16.55 3.44998 17 3.99998 17H6.99998C7.54998 17 7.99998 16.55 7.99998 16Z" />
    </svg>
  );
}

// Setting default values for the props of Office
Home.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Home.propTypes = {
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

export default Home;
