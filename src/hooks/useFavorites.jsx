import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFavorites = (boolean, id) => {

    const [style, setStyle] = useState("");

    const favorites = useSelector((state) => state.favorites);

    useEffect(() => {
        const product = favorites.find((prod) => prod.ProductId === id);

        product.deletedAt == null && setStyle("red");
    }, [boolean]);

    useEffect(() => {
        const product = favorites.find((prod) => prod.ProductId === id);

        product.deletedAt != null && setStyle("black");
    }, [boolean])

    return style;
};