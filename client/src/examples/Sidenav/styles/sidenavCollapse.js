function collapseItem(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav } = ownerState;

  const { dark, white, text, transparent, lightBlue, lightGrey } = palette;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    // background: active && transparentSidenav ? white.main : transparent.main,
    color: active ? lightBlue.main : lightGrey.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(4)} ${pxToRem(12.8)} ${pxToRem(4)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    fontWeight: "700",
    fontSize: "16px",
    // boxShadow: active && transparentSidenav ? xxl : "none",
    [breakpoints.up("xl")]: {
      // boxShadow: () => {
      //   if (active) {
      //     return transparentSidenav ? xxl : "none";
      //   }

      //   return "none";
      // },
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav, color } = ownerState;

  const { white, info, light, gradients, lightBlue, lightGrey } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    // background: () => {
    //   if (active) {
    //     return lightBlue.main;
    //   }

    //   return light.main;
    // },
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    borderRadius: borderRadius.md,
    display: "grid",
    placeItems: "center",
    // boxShadow: md,
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    // [breakpoints.up("xl")]: {
    //   background: () => {
    //     let background;

    //     if (!active) {
    //       background = transparentSidenav ? white.main : light.main;
    //     } else if (color === "default") {
    //       background = lightGrey.main;
    //     } else if (color === "warning") {
    //       background = gradients.warning.main;
    //     } else {
    //       background = palette[color].main;
    //     }

    //     return background;
    //   },
    // },

    "& svg, svg g": {
      fill: active ? lightBlue.main : lightGrey.main,
    },
  };
}

const collapseIcon = ({ palette: { white, gradients, lightBlue, lightGrey } }, { active }) => ({
  color: "red",
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, transparentSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(12.8),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
      maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
      marginLeft: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : pxToRem(12.8),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
    },
  };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText };
