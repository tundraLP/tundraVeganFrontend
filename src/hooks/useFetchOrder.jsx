import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_orders, put_error } from '../redux/actions';
import axios from "axios";

export const useFetchOrder = (UserId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fectchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/order/getOrdersById?UserId=${UserId}`).then((res) => res.data);
                dispatch(get_orders(response));
            } catch (error) {
                dispatch(put_error(error));
            };
        };

        fectchData();
    }, []);
};