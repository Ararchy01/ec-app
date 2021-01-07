import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ImageArea } from "../components/products";
import {
  TextInput,
  Spacer,
  SelectBox,
  PrimaryButton,
} from "../components/uikit";
import { db } from "../firebase";
import { addProduct } from "../reducks/products/operations";

const ProductRegistration = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split("/product/register")[1];

  if (id !== "") {
    id = id.split("/")[1];
  }

  const buttonLabel = id === "" ? "register" : "update";

  const [images, setImages] = useState([]),
    [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [price, setPrice] = useState(0);

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: "tops", name: "Tops" },
    { id: "bottoms", name: "Bottoms" },
    { id: "jackets", name: "Jackets" },
  ];

  const genders = [
    { id: "mens", name: "Mens" },
    { id: "womens", name: "Womens" },
    { id: "unisex", name: "Unisex" },
  ];

  useEffect(() => {
    if (id !== "") {
      db.collection("products")
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          setCategory(data.category);
          setDescription(data.description);
          setGender(data.gender);
          setImages(data.images);
          setName(data.name);
          setPrice(data.price);
        });
    }
  }, [id]);

  return (
    <section>
      <h2 className="u-text__headline u-text-center">Product Registration</h2>
      <div className="c-section-container">
        <Spacer />
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"Name"}
          multiline={false}
          required={true}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput
          fullWidth={true}
          label={"Description"}
          multiline={true}
          required={true}
          rows={10}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
        <SelectBox
          label={"Category"}
          required={true}
          value={category}
          options={categories}
          select={setCategory}
        />
        <SelectBox
          label={"Gender"}
          required={true}
          value={gender}
          options={genders}
          select={setGender}
        />
        <TextInput
          fullWidth={true}
          label={"Price"}
          multiline={false}
          required={true}
          rows={1}
          value={price}
          type={"number"}
          onChange={inputPrice}
        />
        <Spacer />
        <div className="center">
          <PrimaryButton
            label={buttonLabel}
            onClick={() =>
              dispatch(
                addProduct(name, description, category, gender, price, images)
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductRegistration;
