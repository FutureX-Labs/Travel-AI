import PropTypes from "prop-types";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function Logout({ color, size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.91824 9.91371C9.7798 9.77603 9.71059 9.61199 9.71059 9.4216C9.71059 9.23121 9.7798 9.06927 9.91824 8.93575L11.1642 7.69664H5.86288C5.66731 7.69664 5.5025 7.62969 5.36845 7.49579C5.23441 7.36188 5.16738 7.19725 5.16738 7.00188C5.16738 6.8065 5.23441 6.64288 5.36845 6.51102C5.5025 6.37916 5.66731 6.31323 5.86288 6.31323H11.129L9.85564 5.04679C9.72891 4.92644 9.6672 4.77264 9.6705 4.58539C9.67381 4.39815 9.74594 4.23538 9.88688 4.09708C10.0188 3.95879 10.1838 3.89129 10.3817 3.89458C10.5797 3.89786 10.7479 3.96834 10.8863 4.10602L13.3308 6.53722C13.402 6.60969 13.4544 6.68741 13.488 6.77039C13.5217 6.85337 13.5385 6.93852 13.5385 7.02582C13.5385 7.11314 13.5217 7.19725 13.488 7.27816C13.4544 7.35908 13.402 7.43555 13.3308 7.50758L10.8939 9.93118C10.7672 10.0572 10.6092 10.1202 10.4198 10.1202C10.2305 10.1202 10.0633 10.0514 9.91824 9.91371ZM1.86248 13.5385C1.47922 13.5385 1.14992 13.4025 0.874571 13.1306C0.599222 12.8587 0.461548 12.5335 0.461548 12.1551V1.85481C0.461548 1.47364 0.599222 1.14614 0.874571 0.872292C1.14992 0.598458 1.47922 0.46154 1.86248 0.46154H6.34612C6.54169 0.46154 6.7065 0.530421 6.84055 0.668182C6.97459 0.805955 7.04162 0.97224 7.04162 1.16704C7.04162 1.36183 6.97459 1.52516 6.84055 1.65702C6.7065 1.78888 6.54169 1.85481 6.34612 1.85481H1.86248V12.1551H6.34612C6.54169 12.1551 6.7065 12.222 6.84055 12.3559C6.97459 12.4898 7.04162 12.6545 7.04162 12.8498C7.04162 13.0452 6.97459 13.2088 6.84055 13.3407C6.7065 13.4725 6.54169 13.5385 6.34612 13.5385H1.86248Z"
        fill={colors[color] ? colors[color].main : colors.dark.main}
      />
    </svg>
  );
}

// Setting default values for the props of Office
Logout.defaultProps = {
  color: "dark",
  size: "16px",
};

// Typechecking props for the Office
Logout.propTypes = {
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

export default Logout;
