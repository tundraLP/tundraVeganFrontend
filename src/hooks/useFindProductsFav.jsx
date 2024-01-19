import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useFindProductsFav = () => {
    const [render, setRender] = useState([]);

    const products = useSelector((state) => state.products);

    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        setRender([]);
        favorites?.forEach((fav) => {
            const prod = products.find((prod) => prod.id === fav.ProductId);
            if (prod) {
                const newProd = {
                    ...prod,
                    ProductId: fav.ProductId,
                    id: fav.id,
                    deletedAt: fav.deletedAt,
                };
                if (fav.deletedAt == null) setRender(prev => [...prev, newProd]);
            };
        });
    }, [favorites]);

    return render;
};