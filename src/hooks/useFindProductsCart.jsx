import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useFindProductsCart = () => {
    const [render, setRender] = useState([]);

    const products = useSelector((state) => state.products);

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        setRender([]);

        cart?.map((prod) => {
            const product = products.find((pro) => pro.id === prod.id);
            product.count = prod.count;
            setRender(prev => [...prev, product]);
        })
    }, [cart]);

    return render;
};