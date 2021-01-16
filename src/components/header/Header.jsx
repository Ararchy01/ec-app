import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/Toolbar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "../../assets/img/icons/arakiengineering.png";
import { useDispatch, useSelector } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/selectors";
import { push } from "connected-react-router";
import HeaderMenus from "./HeaderMenus";
import ClosableDrawer from "./ClosableDrawer";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#ff04",
    color: "#444",
  },
  toolBar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%",
  },
  iconButtons: {
    margin: "0 0 0 auto",
  },
  imgWrap: {
    margin: "5px",
  },
});

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <div className={classes.imgWrap}>
            <img
              src={logo}
              alt="Logo"
              width="50px"
              onClick={() => dispatch(push("/"))}
            />
          </div>
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
