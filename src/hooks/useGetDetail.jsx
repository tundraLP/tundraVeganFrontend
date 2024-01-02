import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_detail, clean_detail } from "../redux/actions";

export const useGetDetail = (id, products) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const product = products.find((prod) => prod.id === id);

        dispatch(get_detail(product));

        document.title = `Tundra Food | ${product.name}`;

        return () => {
            dispatch(clean_detail());
            document.title = 'Tundra Food';
        };
    }, [id]);
};