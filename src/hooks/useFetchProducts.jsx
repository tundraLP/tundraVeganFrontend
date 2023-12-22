import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_products, put_error } from '../redux/actions';
import axios from "axios";

export const useFetchProducts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/product/getProducts`).then((res) => res.data);

                dispatch(get_products(response));
            } catch (error) {
                dispatch(put_error(error));
            };
        };

        fetchData();
    }, []);
};