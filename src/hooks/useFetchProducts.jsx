import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import axios from "axios";

export const useFetchProducts = () => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await axios.get(`${uriBack}/product/getProducts`);

    }, []);
};