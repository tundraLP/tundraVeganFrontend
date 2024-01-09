import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useFindProductsFav = () => {
    const [render, setRender] = useState([]);

    const products = useSelector((state) => state.products);

    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        setRender([]);
        favorites?.map((fav) => {
            const prod = products.find((prod) => prod.id === fav.ProductId);
            setRender(prev => [...prev, prod]);
        });
    }, [favorites]);

    return render;
};