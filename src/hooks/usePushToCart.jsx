import { useDispatch } from "react-redux";
import { add_to_cart } from "../redux/actions";

export const usePushToCart = (count, id) => {

    const dispatch = useDispatch();

    const prod = {
        count: count,
        id: id
    };

    dispatch(add_to_cart(prod));
};