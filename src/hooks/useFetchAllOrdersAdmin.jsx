import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { put_error, clean_error, get_orders } from "../redux/actions";
import { uriBack } from "../utils/const";
import axios from "axios";

export const useFetchAllOrdersAdmin = () => {

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

        return () => dispatch(clean_error());
    }, []);
};