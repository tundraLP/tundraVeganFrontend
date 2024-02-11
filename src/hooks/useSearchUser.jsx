import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export const useSearchUser = (mail) => {
    const [user, setUser] = useState(undefined);

    const clients = useSelector((state) => state.clients);

    useEffect(() => {
        const client = clients.find((client) => client.mail === mail);

        setUser(client);
    }, [mail]);

    return user;
};