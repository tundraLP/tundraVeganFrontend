import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_order } from '../redux/actions';
import axios from "axios";

export const useFetchOrder = (UserId) => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await axios.get(`${uriBack}/order/getOrdersById?UserId=${UserId}`).then((res) => res.data);

        dispatch(get_order(response));
    }, []);
};