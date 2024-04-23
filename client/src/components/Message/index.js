import React from "react";
import "./style.css";
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
import { FaUserLarge } from "react-icons/fa6";
import { PiAirplaneTiltFill } from "react-icons/pi";

const Message = ({ userType, message }) => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
        {userType === "User" ? (
          <Box sx={{ maxWidth: "1192px", width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "start" }}>
              <Box
                sx={{
                  borderRadius: "50%",
                  border: "1px solid #416BA3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  marginRight: 2,
                  marginTop: "9px",
                }}
              >
                <FaUserLarge color="#87E2E8" size={"20px"} />
              </Box>
              <Typography
                sx={{
                  maxWidth: "1192px",
                  width: "100%",
                  minHeight: "40px",
                  backgroundColor: "#16181a",
                  flexGrow: 1,
                  borderRadius: "14px",
                  border: "1px solid #416BA3",
                  color: "#D5D8E6",
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: "lighter",
                  padding: "9px",
                }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ maxWidth: "1192px", width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "start" }}>
              <Box
                sx={{
                  borderRadius: "50%",
                  border: "1px solid #416BA3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5px",
                  marginRight: 2,
                  marginTop: "8px",
                }}
              >
                <PiAirplaneTiltFill color="#87E2E8" size={"20px"} />
              </Box>
              <Typography
                sx={{
                  maxWidth: "1192px",
                  width: "100%",
                  minHeight: "40px",
                  backgroundColor: "#16181a",
                  flexGrow: 1,
                  borderRadius: "14px",
                  border: "1px solid #416BA3",
                  color: "#D5D8E6",
                  fontSize: "18px",
                  lineHeight: "28px",
                  fontWeight: "lighter",
                  padding: "8px",
                }}
              >
                {message}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

Message.defaultProps = {
  userType: "User",
  message: "string",
};

Message.propTypes = {
  userType: PropTypes.oneOf(["User", "Ai"]),
  message: PropTypes.string,
};

export default Message;
