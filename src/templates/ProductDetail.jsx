import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import Spacer from "../components/uikit/Spacer";

const useStyles = makeStyles((theme) => ({
  slideBox: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 24px auto",
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up("sm")]: {
      margin: "0 auto",
      height: 400,
      width: 400,
    },
  },
  detail: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto 16px auto",
      height: "auto",
      width: 320,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      height: "auto",
      width: 400,
    },
  },
  price: {
    fontSize: 36,
  },
  description: {
    whiteSpace: "pre-wrap",
  },
}));

const ProductDetail = () => {
  const selector = useSelector((state) => state);
  const id = selector.router.location.pathname.split("/product/")[1];
  const classes = useStyles();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
  }, [id]);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.slideBox}></div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>${product.price.toLocaleString()}</p>
            <Spacer />
            <Spacer />
            <p className={classes.description}>{product.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
