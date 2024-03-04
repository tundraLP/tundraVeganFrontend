import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useFindReviewBoolean = (id) => {
    const reviews = useSelector((state) => state.reviews);
    const user = useSelector((state) => state.user);

    const [boolean, setBoolean] = useState(false);

    useEffect(() => {
        const filterReviews = reviews.filter((review) => review.ProductId === id);
        const reviewOfUser = filterReviews.find((review) => review.UserId == user.id);

        if (reviewOfUser) setBoolean(!boolean);
    }, []);

    return boolean;
};