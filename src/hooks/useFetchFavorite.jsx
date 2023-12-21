import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import axios from "axios";

export const useFetchFavorite = (UserId) => {
    const dispatch = useDispatch();

    useEffect(async() => {
        const response = await axios.get(`${uriBack}/favorite/getFavoritesById?UserId=${UserId}`);

    }, []);
};