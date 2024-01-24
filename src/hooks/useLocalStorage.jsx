import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add_to_cart, clean_cart } from "../redux/actions";

export const useLocalStorage = () => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user);

    const products = useSelector((state) => state.products);

    const date = new Date();

    const day = date.getDate();

    useEffect(() => {
        if (user) {
            const cartLS = localStorage.getItem('cart');

            if (cartLS) {
                const parsed = JSON.parse(cartLS);

                if (parsed.day == day && user.id == parsed.id) {
                    parsed.cart.forEach((prod) => {
                        const newProd = products.find((pro) => pro.id === prod.id);

                        const pushedProd = {
                            ...newProd,
                            count: prod.count
                        };

                        if (newProd) dispatch(add_to_cart(pushedProd));
                    });
                }
            }
        };
    }, [user]);
};