import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_favorite } from '../redux/actions';
import axios from "axios";

export const useFetchFavorite = (UserId) => {
    const dispatch = useDispatch();

    useEffect(async () => {
        const response = await axios.get(`${uriBack}/favorite/getFavoritesById?UserId=${UserId}`);

        dispatch(get_favorite(response));
    }, []);
};