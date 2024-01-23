import React, { useState } from 'react';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import './ItemList.css'
import Pagination from '../Pagination/Pagination';

const ItemList = ({ products }) => {

  const user = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPerPage, setQuantityPerPage] = useState(6);
  const totalPages = Math.ceil(products.length / quantityPerPage);

  const firstIndex = (currentPage - 1) * quantityPerPage;
  const lastIndex = Math.min(firstIndex + quantityPerPage, products.length);

  const quantityOptions = [ 6, 12, 100 ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuantityChange = (num) =>{
    setQuantityPerPage(num);
    setCurrentPage(1);
  }

  return (
    <>
      <section className='layout'>
        {products.length > 0 &&
          products.slice(firstIndex, lastIndex).map((prod) => (
            <Item key={prod.id} {...prod} user={user} />
          ))}
      </section>
      
      <section>
        {products.length > 0 &&
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
        {
         quantityOptions.map((option)=>
         (<button key={option} 
            className={option === quantityPerPage ? 'active' : ''} 
            onClick={() => handleQuantityChange(option)}
            disabled={option === quantityPerPage}
         >{option}</button> ))}
      </section>
    </>
  );
};

export default ItemList