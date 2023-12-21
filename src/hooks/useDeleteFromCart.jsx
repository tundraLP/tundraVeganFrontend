import { useDispatch } from "react-redux";
import { delete_from_cart } from "../redux/actions";

export const useDeleteFromCart = (itemId) => {

    const dispatch = useDispatch();

    dispatch(delete_from_cart(itemId));
};