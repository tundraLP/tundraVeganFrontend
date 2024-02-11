import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { get_clients, clean_clients, put_error, clean_error } from "../redux/actions";
import axios from "axios";
import { uriBack } from '../utils/const';

export const useFetchUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${uriBack}/user/getUsersAdmin`).then((res) => res.data);

                dispatch(get_clients(response));
            } catch (error) {
                dispatch(put_error(error.response.data));
            };
        };

        fetchData();

        return () => {
            dispatch(clean_clients());
            dispatch(clean_error());
        };
    }, []);
    
};