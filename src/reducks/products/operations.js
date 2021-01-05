import { push } from "connected-react-router";
import {db, FirebaseTimestamp} from "../../firebase";

const productsTable = db.collection('products');

export const registerProduct = (name, description, category, gender, price, images) => {
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
      updated_at: timestamp
    }

    return productsTable.add(data)
      .then(() => {
        dispatch(push('/'));
      })
      .catch((error) => {
        throw new Error(error);
      })
  }
}