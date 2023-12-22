import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add_to_cart, clean_cart } from "../redux/actions";

export const useLocalStorage = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const date = new Date();

    const day = date.getDate();

    useEffect(() => {
        if (user) {
            const cartLS = localStorage.getItem('cart');

            if (cartLS) {
                const parsed = JSON.parse(cartLS);
                if (parsed.day == day && user.id == parsed.id) dispatch(add_to_cart(parsed.cart));
                else dispatch(clean_cart());
            };
        };
    }, [user]);
};