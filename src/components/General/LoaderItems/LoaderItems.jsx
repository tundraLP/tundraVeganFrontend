import React from 'react';
import { useState } from 'react';
import LoaderItem from '../LoaderItem/LoaderItem';

const LoaderItems = () => {

    const [array, setArray] = useState(["", "", "", "", "", ""]);

    return (
        <section className='layout'>
            {array.map((_, index) => <LoaderItem key={index} />)}
        </section>
    );
};

export default LoaderItems;