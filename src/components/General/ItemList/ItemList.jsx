import React, { useState } from 'react';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import './ItemList.css'
import Pagination from '../Pagination/Pagination';
import ButtonPagination from '../ButtonPagination/ButtonPagination';

const ItemList = ({ products }) => {

  const user = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [quantityPerPage, setQuantityPerPage] = useState(2);
  const totalPages = Math.ceil(products.length / quantityPerPage);

  const firstIndex = (currentPage - 1) * quantityPerPage;
  const lastIndex = Math.min(firstIndex + quantityPerPage, products.length);

  const quantityOptions = [6, 12, products.length];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuantityChange = (num) => {
    setQuantityPerPage(num);
    setCurrentPage(1);
  }

  return (
    <>
      <section className='layout'>
        {
          products.length > 0 &&
          products.slice(firstIndex, lastIndex).map((prod) => <Item key={prod.id} {...prod} user={user} />)
        }
      </section>

      <section className='section-pagination'>
        {
          products.length > 0 &&
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        }
        <div className="container-options">

          <span className='span-options'>Filtrar cantidad de productos mostrados</span>

          <div className='container-options-quantity'>
            {
              quantityOptions.map((option) =>
                <ButtonPagination
                  key={option}
                  quantityPerPage={quantityPerPage}
                  handleQuantityChange={handleQuantityChange}
                  option={option}
                />
              )
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemList