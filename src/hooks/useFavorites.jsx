import { useEffect } from "react";

export const useFavorites = (boolean, favorites, id, setStyle) => {

    useEffect(() => {
        const product = favorites.find((prod) => prod.ProductId === id);

        product && product.deletedAt == null && setStyle("red");
        product && product.deletedAt != null && setStyle("black");
    }, [boolean]);
};