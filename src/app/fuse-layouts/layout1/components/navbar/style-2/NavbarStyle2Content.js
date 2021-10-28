import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import NavbarToggleButton from "app/fuse-layouts/shared-components/NavbarToggleButton";
import Navigation from "app/fuse-layouts/shared-components/Navigation";
import clsx from "clsx";
import { memo } from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.24)"
        : "rgba(255, 255, 255, 0.24)"
    }`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${
      theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.37)"
        : "rgba(255, 255, 255, 0.37)"
    }`,
  },
}));

const StyledContent = styled(FuseScrollbars)(({ theme }) => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  "-webkit-overflow-scrolling": "touch",
  background:
    "linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
}));

function NavbarStyle2Content(props) {
  const theme = useTheme();
  const settings = useSelector(({ fuse }) => fuse.settings.current);

  return (
    <Root
      className={clsx(
        "flex flex-auto flex-col overflow-hidden h-full",
        props.className
      )}
    >
      <AppBar
        color="primary"
        position="static"
        className="flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0"
      >
        <div className="flex flex-1 items-center justify-center mx-4">
          {/* <Logo /> */}
          <Typography
            color="inherit"
            className={
              !settings.layout.config.navbar.folded
                ? "text-20 font-bold tracking-tight"
                : "text-16 font-bold tracking-tight"
            }
          >
            XRPL {!settings.layout.config.navbar.folded && "Datamart"}
          </Typography>
        </div>

        <NavbarToggleButton className="w-40 h-40 p-0" />
      </AppBar>

      <StyledContent
        option={{ suppressScrollX: true, wheelPropagation: false }}
      >
        {/* <UserNavbarHeader /> */}

        <Navigation layout="vertical" />
      </StyledContent>
    </Root>
  );
}

export default memo(NavbarStyle2Content);
