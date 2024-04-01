import { useState, useEffect } from "react";
import { ProductMarket } from '../utils/classProductMarket'

export const usePreparePayment = (cart) => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        cart.forEach((prod) => {

            const price = parseInt(prod.price);

            const prodToPush = new ProductMarket(prod.name, prod.quantity, price);

            setArray(prev => [...prev, prodToPush]);
        });
    }, [cart]);

    return array;
};