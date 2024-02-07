import { useState, useEffect } from "react";
import { months } from "../utils/const";

export const useGetDateOrder = (createdAt) => {

    const [date, setDate] = useState("");

    useEffect(() => {
        let completeDate = "";

        for (let i = 8; i <= 9; i++) {
            const letter = createdAt[i];
            completeDate += letter;
        };

        completeDate += " de ";

        let month = "";
        for (let i = 5; i <= 6; i++) {
            const letter = createdAt[i];
            month += letter;
        };

        const number = parseInt(month);

        month = months[number - 1];

        completeDate += `${month} del `;

        for (let i = 0; i <= 3; i++) {
            const letter = createdAt[i];
            completeDate += letter;
        };
        setDate(completeDate);
    }, []);

    return date;
};