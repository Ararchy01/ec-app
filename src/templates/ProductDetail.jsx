import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, FirebaseTimestamp } from "../firebase";
import Spacer from "../components/uikit/Spacer";
import ImageSwiper from "../components/products/ImageSwiper";

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
    textAlign: "left",
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
    color: "red",
  },
  description: {
    whiteSpace: "pre-wrap",
  },
}));

const ProductDetail = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
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

  const addProduct = useCallback(() => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(
      addProductCard({
        added_at: timestamp,
        product: product,
        quantity: 1,
      })
    );
  }, [product]);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.slideBox}>
            <ImageSwiper images={product.images} />
          </div>
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
