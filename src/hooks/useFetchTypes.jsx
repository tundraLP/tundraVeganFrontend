import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { uriBack } from "../utils/const";
import { get_types, put_error } from '../redux/actions';
import axios from "axios";

export const useFetchTypes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await axios.get(`${uriBack}/type/getTypes`).then((res) => res.data);
                dispatch(get_types(response));
            } catch (error) {
                dispatch(put_error(error));
            }
        }

        fetchData();
    }, []);
}