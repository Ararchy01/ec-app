import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import NoImage from "../../assets/img/src/no_image.png";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      margin: 8,
      width: "calc(50% - 16px)",
    },
    [theme.breakpoints.up("sm")]: {
      margin: 16,
      width: "calc(33.3333% - 32px)",
    },
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
  content: {
    display: "flex",
    padding: "16px 8px",
    textAlign: "left",
    "&:last-child": {
      paddingBottom: 16,
    },
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }];
  const price = props.price.toLocaleString();
  return (
    <Card className={classes.root} key={props.id}>
      <CardMedia
        image={images[0].path}
        className={classes.media}
        onClick={() => dispatch(push("/product/" + props.id))}
      />
      <CardContent
        className="classes.content"
        onClick={() => dispatch(push("/product/" + props.id))}
      >
        <Typography color="textSecondary" component="p">
          {props.name}
        </Typography>
        <Typography component="p" className={classes.price}>
          ${price}
        </Typography>
        <>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                dispatch(push("/product/register/" + props.id));
                handleClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem>Delete</MenuItem>
          </Menu>
        </>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
