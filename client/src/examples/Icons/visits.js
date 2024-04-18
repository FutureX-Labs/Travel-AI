/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Visits({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 20"
      fill={colors[color] ? colors[color].main : colors.dark.main}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.64996 17.2571C9.26321 17.568 8.71531 17.568 8.32856 17.2571L1.72158 11.9489C1.33483 11.638 0.797672 11.638 0.410922 11.9489C-0.136974 12.3931 -0.136974 13.2482 0.410922 13.6924L7.67323 19.5336C8.44673 20.1555 9.53178 20.1555 10.316 19.5336L17.5783 13.6924C18.1262 13.2482 18.1262 12.3931 17.5783 11.9489L17.5676 11.9378C17.1808 11.6269 16.6437 11.6269 16.2569 11.9378L9.64996 17.2571ZM10.3268 13.9034L17.5891 8.06219C18.137 7.61799 18.137 6.7518 17.5891 6.30761L10.3268 0.466408C9.55327 -0.155469 8.46822 -0.155469 7.68398 0.466408L0.421665 6.31871C-0.126231 6.76291 -0.126231 7.62909 0.421665 8.07329L7.68398 13.9145C8.45748 14.5364 9.55327 14.5364 10.3268 13.9034Z" />
    </svg>
  );
}

// Setting default values for the props of Office
Visits.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Visits.propTypes = {
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

export default Visits;