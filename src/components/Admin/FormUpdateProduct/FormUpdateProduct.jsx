import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { put_error } from "../../../redux/actions";
import { uriBack } from "../../../utils/const";
import { validate } from "../../../utils/validateInput";
import Input from "../../General/Input/Input";
import ProductToUpdate from "../../../utils/classProductToUpdate";
import axios from "axios";
import './FormUpdateProduct.css';

const FormUpdateProduct = ({ product, changeUpdate, updateOn, chargeMessage }) => {

  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);

  const [input, setInput] = useState({
    ...product,
    price: parseInt(product.price),
  });

  const [error, setError] = useState({
    name: "",
    image: "",
    price: "",
    stock: "",
    description: "",
    type: "",
  });

  const errorMessage = error.name || error.description || error.image || error.type || error.price || error.stock;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newImageBool = false;
      let productToUpdate;
      if (input.image != product.image) {
        const imageForm = {
          image: input.image,
          folder: input.type,
          name: input.name,
        };
        const imageUrl = await axios
          .post(`${uriBack}/image/uploadImage`, imageForm)
          .then((res) => {
            return res.data.secure_url;
          });
        newImageBool = imageUrl;
      }
      productToUpdate = newImageBool
        ? new ProductToUpdate({ ...input, image: newImageBool }, product)
        : new ProductToUpdate(input, product);
      if (productToUpdate.readyToUpdate) {
        const response = await axios.put(
          `${uriBack}/product/updateProduct`,
          productToUpdate
        );
        if (response.status == 201) {
          chargeMessage(response.data);
          setUpdateOn(!updateOn);
        } else setMessage('Hubo un error al actualizar el producto.');
      } else alert(`No se selecciono ningun cambio en el producto.`);
    } catch (error) {
      dispatch(put_error(error));
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(validate({ ...input, [e.target.name]: e.target.value }, error));
  };

  const handleTypeChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value) {
      setInput({
        ...input,
        type: value,
      });
      setError(validate({ ...input, type: e.target.value }, error));
    }
  };

  const handleChangeImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const img = document.getElementById("img-preview");
        img.src = base64Image;
        setInput({ ...input, image: base64Image });
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setInput({ ...input, image: product.image });
      const img = document.getElementById("img-preview");
      img.src = product.image;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-prod">
        <div className="image-input">
          <p className="p">Imagen del producto</p>
          <img
            className="img"
            src={product.image}
            alt="Profile image"
            id="img-preview"
          />
          <input
            className="input-file"
            type="file"
            name="image"
            id="image"
            onChange={handleChangeImage}
            accept=".jpeg, .jpg, .png, .webp"
            size="2.621.440" // size = 2.5 mb
          />
          <label for="image" className="button-form">
            Cambiar foto
          </label>
        </div>

        <Input
          button={false}
          errorInput={error.name}
          handleInput={handleChange}
          id={"name"}
          label={"Nombre:"}
          name={"name"}
          style={""}
          type={"text"}
          value={input.name}
          key={"name"}
        />

        <Input
          button={false}
          errorInput={error.description}
          handleInput={handleChange}
          id={"description"}
          label={"Descripcion:"}
          name={"description"}
          style={""}
          type={"text"}
          value={input.description}
        />

        <Input
          button={false}
          errorInput={error.price}
          handleInput={handleChange}
          id={"price"}
          label={"Precio por unidad:"}
          name={"price"}
          style={""}
          type={"text"}
          value={input.price}
          key={"price"}
        />

        <Input
          button={false}
          errorInput={error.stock}
          handleInput={handleChange}
          id={"stock"}
          label={"Unidades en stock:"}
          name={"stock"}
          style={""}
          type={"text"}
          value={input.stock}
          key={"stock"}
        />

        <div className="box-input">
          <label htmlFor="type" className="label-form">
            Categoria:{" "}
          </label>
          <select onChange={handleTypeChange} className="select-product">
            <option key={product.Type.name} value={product.Type.name}>
              {product.Type.name}
            </option>
            {types.map(
              (type) =>
                type.name != product.Type.name && (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                )
            )}
          </select>
          <span className="span-form-error">{error.type}</span>
        </div>
        {
          errorMessage ?
            <span className="span-form-error">Se encontraron errores.</span> :
            <button type="submit" className="button-form">Actualizar producto</button>
        }
        <button className="button-form" onClick={changeUpdate}>Cancelar</button>
      </form>
    </>
  );
};

export default FormUpdateProduct;
