import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { uriBack } from "../utils/const";
import { get_clients, put_error } from "../redux/actions";

export const useFetchAllUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/user/getUsersAdmin`).then((res) => res.data);
                dispatch(get_clients(response));
            } catch (error) {
                dispatch(put_error(error.response.data.error));
            };
        };

        fetchData();
    }, []);
}