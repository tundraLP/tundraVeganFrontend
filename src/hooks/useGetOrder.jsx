import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_detail } from "../redux/actions";

export const useGetOrder = (OrderId) => {

    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders);

    useEffect(() => {
        const order = orders.find((ord) => ord.id === OrderId);

        dispatch(get_detail(order));
    }, []);
};