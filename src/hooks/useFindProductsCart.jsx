import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useFindProductsCart = () => {
    const [render, setRender] = useState([]);

    const products = useSelector((state) => state.products);

    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        setRender([]);

        cart?.forEach((prod) => {
            const product = products.find((pro) => pro.id === prod.id);
            const newProd = {
                ...product,
                count: prod.count
            };
            setRender(prev => [...prev, newProd]);
        });
    }, [cart]);

    return render;
};