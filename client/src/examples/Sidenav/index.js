import { useEffect } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavCard from "examples/Sidenav/SidenavCard";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Soft UI Dashboard React context
import { useSoftUIController, setMiniSidenav } from "context";
import { Box, Button } from "@mui/material";
import user from "../../assets/images/user.png";
import Logout from "examples/Icons/Logout";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);

    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            color={color}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <NavLink to={route} key={key}>
          <SidenavCollapse
            color={color}
            key={key}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </NavLink>
      );
    } else if (type === "title") {
      returnValue = (
        <SoftTypography
          key={key}
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          opacity={0.6}
          color="white"
          pl={3}
          mt={2}
          mb={1}
          ml={2}
        >
          {title}
        </SoftTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider key={key} />;
    }

    return returnValue;
  });

  return (
    <>
      <Box sx={{ backgroundColor: "red !important" }}>
        <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
          <SoftBox pt={3} pb={1} px={4} textAlign="center">
            <SoftBox
              display={{ xs: "block", xl: "none" }}
              position="absolute"
              top={0}
              right={0}
              p={1.625}
              onClick={closeSidenav}
              sx={{ cursor: "pointer" }}
            >
              <SoftTypography variant="h6" color="secondary">
                <Icon sx={{ fontWeight: "bold" }}>close</Icon>
              </SoftTypography>
            </SoftBox>
            <SoftBox
              component={NavLink}
              to="/"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {/* {brand && <SoftBox component="img" src={brand} alt="Soft UI Logo" width="2rem" />} */}
              <SoftBox
                // width={!brandName && "100%"}
                sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
                display="flex"
              >
                <SoftTypography fontWeight="bold" fontSize="26px" sx={{ color: "#87E2E8" }}>
                  Travel A
                </SoftTypography>
                <SoftTypography fontWeight="300" fontSize="26px" sx={{ color: "#87E2E8" }}>
                  I Free
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
          <Divider />
          <List>{renderRoutes}</List>
          <Box
            px={2}
            my={2}
            mx={2}
            mt="auto"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="lightBlack"
            height="50px"
            borderRadius="40px"
            boxShadow={"2px 2px 40px .2px #7090B0"}
            fullwidth
          >
            <Box display="flex" alignItems="center" justifyContent="start">
              <img src={user} alt="user" style={{ borderRadius: "50%" }} />
              <SoftTypography color="lightBlue" fontSize="15px" fontWeight="bold" ml="8px">
                Alen
              </SoftTypography>
            </Box>
            <Box
              borderRadius="50%"
              border={"1px solid lightGrey"}
              width={"30px"}
              height={"30px"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Logout color="lightBlue" />
            </Box>
          </Box>
        </SidenavRoot>
      </Box>
    </>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "background",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "lightBlue",
    "lightGrey",
    "lightBlack",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
