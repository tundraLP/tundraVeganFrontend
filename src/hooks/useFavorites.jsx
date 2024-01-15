import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFavorites = (id) => {

    const [style, setStyle] = useState("");

    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        const product = favorites.find((prod) => prod.ProductId === id);

        if (product){
            product.deletedAt == null && setStyle("red");
            product.deletedAt != null && setStyle("black");
        };
    }, [favorites]);

    return style;
};