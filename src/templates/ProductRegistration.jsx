import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ImageArea } from '../components/products';
import { TextInput, Spacer, SelectBox, PrimaryButton } from '../components/uikit';
import { registerProduct } from '../reducks/products/operations';

const ProductRegistration = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]),
        [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [gender, setGender] = useState(""),
        [price, setPrice] = useState(0);

  const inputName = useCallback((event) => {
    setName(event.target.value);
  }, [setName]);

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value);
  }, [setDescription]);
  
  const inputPrice = useCallback((event) => {
    setPrice(event.target.value);
  }, [setPrice]);

  const categories = [
    {id: "tops", name: "Tops"},
    {id: "bottoms", name: "Bottoms"},
    {id: "jackets", name: "Jackets"}
  ]
  const genders = [
    {id: "mens", name: "Mens"},
    {id: "womens", name: "Womens"},
    {id: "unisex", name: "Unisex"}
  ]

  return (
    <section>
      <h2 className="u-text__headline u-text-center">Product Registration</h2>
      <div className="c-section-container">
        <Spacer />
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true} label={"Name"} multiline={false} required={true}
          rows={1} value={name} type={"text"} onChange={inputName}
        />
        <TextInput
          fullWidth={true} label={"Description"} multiline={true} required={true}
          rows={10} value={description} type={"text"} onChange={inputDescription}
        />
        <SelectBox
          label={"Category"} required={true} value={category} options={categories} select={setCategory}
        />
        <SelectBox
          label={"Gender"} required={true} value={gender} options={genders} select={setGender}
        />
        <TextInput
          fullWidth={true} label={"Price"} multiline={false} required={true}
          rows={1} value={price} type={"number"} onChange={inputPrice}
        />
        <Spacer />
        <div className="center">
          <PrimaryButton 
            label="Register" 
            onClick={() => dispatch(registerProduct(name, description, category, gender, price, images))}
          />
        </div>
      </div>
    </section>
  )
}

export default ProductRegistration;