import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Input from "../../General/Input/Input";
import ProductToUpdate from "../../../utils/classProductToUpdate";
import { put_error } from "../../../redux/actions";
import axios from "axios";
import { uriBack } from "../../../utils/const";

const FormUpdateProduct = ({ product, setUpdateOn, updateOn }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
          alert(`Producto actualizado correctamente.`);
          setUpdateOn(!updateOn);
          navigate(`/Inicio`);
        } else alert(`Algo salio mal.`);
      } else alert(`No se selecciono ningun cambio en el producto.`);
    } catch (error) {
      console.log(error);
      dispatch(put_error(error));
    }
  };

  const validate = (input, error) => {
    const errors = { ...error };

    if (!input.name) errors.name = "*Este campo es obligatorio.";
    else if (
      !/^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,50}$/.test(
        input.name
      )
    ) {
      errors.name = `Necesita una nombre de 10 a 50 caracteres. Actual(${input.name.length})`;
    } else errors.name = "";

    if (!input.description) errors.description = "*Este campo es obligatorio.";
    else if (
      !/^[\w\d\sáéíóúÁÉÍÓÚüÜñÑ.,:;¡!¿?(){}[\]\-\/&%$@#"'+=*<>|_]{10,300}$/.test(
        input.description
      )
    ) {
      errors.description = `Necesita una descripcion de 10 a 300 caracteres. Actual(${input.name.length})`;
    } else errors.description = "";

    if (!input.type) errors.type = "*Este campo es obligatorio.";
    else errors.type = "";

    if (!input.price) errors.price = "*Este campo es obligatorio.";
    else if (!/^\d+$/.test(input.price)) {
      errors.price = "Este campo acepta numeros positivos unicamente.";
    } else errors.price = "";

    if (!input.stock) errors.stock = "*Este campo es obligatorio.";
    else if (!/^\d+$/.test(input.stock)) {
      errors.stock = "Este campo acepta numeros positivos unicamente.";
    } else errors.stock = "";

    return errors;
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
      <form onSubmit={handleSubmit}>
        <div className="image-input">
          <h4>Imagen del producto</h4>
          <img
            className="image-preview"
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

        <div>
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
          <span className="span--form">{error.type}</span>
        </div>
        {error.name ||
        error.description ||
        error.image ||
        error.type ||
        error.price ||
        error.stock ? (
          <h3>Se encontraron errores.</h3>
        ) : (
          <button type="submit" className="button-form">
            Actualizar producto
          </button>
        )}
        <button
          className="button-form"
          onClick={(e) => {
            e.preventDefault();
            setUpdateOn(!updateOn);
          }}
        >
          Cancelar
        </button>
      </form>
    </>
  );
};

export default FormUpdateProduct;
