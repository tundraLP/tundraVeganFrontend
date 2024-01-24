import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useFindProductsOrder = (id) => {

    const [render, setRender] = useState([]);

    const orders = useSelector((state) => state.orders);

    useEffect(() => {
        const order = orders.find((order) => order.id === id);

        setRender(order.products);
    }, []);

    return render;
};