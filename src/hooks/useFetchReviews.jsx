import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_review, clean_review, put_error, clean_error } from "../redux/actions";
import axios from "axios";
import { uriBack } from "../utils/const";

export const useFetchReviews = (productId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/review/getProductReviews?ProductId=${productId}`).then((res) => res.data);

                dispatch(get_review(response));
            } catch (error) {
                dispatch(put_error(error.response.data.error));
            };
        };

        fetchData();

        return () => {
            dispatch(clean_review());
            dispatch(clean_error());
        };
    }, []);
};