import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clean_cart, clean_detail, clean_favorites, clean_orders, clean_products } from '../redux/actions';

export const useRedirectHome = () => {

    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        user && navigate('/Inicio');
    }, [user])

    useEffect(() => {
        !user && navigate('/');
        dispatch(clean_cart());
        dispatch(clean_detail());
        dispatch(clean_favorites());
        dispatch(clean_orders());
        dispatch(clean_products());
    }, [user]);
};