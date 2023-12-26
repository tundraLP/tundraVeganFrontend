import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { uriBack } from "../utils/const";
import { get_orders, put_error } from "../redux/actions";

export const useFetchAllOrders = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/order/getAllOrders`).then((res) => res.data);
                dispatch(get_orders(response));
            } catch (error) {
                dispatch(put_error(error.response.data.error));
            };
        };

        fetchData();
    }, [])
}