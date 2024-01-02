import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_favorites, put_error } from '../redux/actions';
import axios from "axios";

export const useFetchFavorite = (UserId, boolean) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/favorite/getFavoritesById?UserId=${UserId}`).then((res) => res.data);
                dispatch(get_favorites(response));
            } catch (error) {
                dispatch(put_error(error.response.data.error));
            };
        };

        fetchData();
    }, [boolean]);
};