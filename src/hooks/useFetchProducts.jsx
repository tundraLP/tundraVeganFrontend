import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_products } from '../redux/actions';
import axios from "axios";

export const useFetchProducts = () => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await axios.get(`${uriBack}/product/getProducts`);

        dispatch(get_products(response));
    }, []);
};