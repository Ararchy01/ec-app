import { push } from "connected-react-router";
import { db, FirebaseTimestamp } from "../../firebase";
import { fetchProductsAction } from "./actions";

const productsTable = db.collection("products");

export const addProduct = (
  name,
  description,
  category,
  gender,
  price,
  images
) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      images: images,
      created_at: timestamp,
      updated_at: timestamp,
    };
    console.log("REGISTER");

    return productsTable
      .add(data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const updateProduct = (
  id,
  name,
  description,
  category,
  gender,
  price,
  images
) => {
  console.log("UPDATE");
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp.now();

    const data = {
      name: name,
      description: description,
      category: category,
      gender: gender,
      price: parseInt(price, 10),
      images: images,
      updated_at: timestamp,
    };

    return productsTable
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    productsTable
      .orderBy("updated_at", "desc")
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};
