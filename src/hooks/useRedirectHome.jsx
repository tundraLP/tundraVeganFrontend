import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirectHome = () => {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        user && navigate('/home');
    }, [user])

    useEffect(() => {
        !user && navigate('/');
    }, [user]);
};