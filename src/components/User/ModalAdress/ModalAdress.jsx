import React from 'react';
import { useState } from 'react';
import './ModalAdress.css';

const ModalAdress = ({ closeModal, adressUser, createOrder }) => {

  const [boolean, setBoolean] = useState(false);

  const [input, setInput] = useState(adressUser);

  const confirmBuy = () => {
    closeModal();
    createOrder(input);
  };

  return (
    <div className='upperContainerAdress'>
      <div className='innerContainerAdress'>
        <button className='button-close' onClick={closeModal}>X</button>
        <p className='p-modal modal-adress'>Tu pedido se va a generar a esta dirección:</p>
        <div className='box-input'>
          <label htmlFor="adress" className='label-modal'>Dirección del pedido:</label>
          <div className='box-pass'>
            <input type="text" readOnly={boolean} value={input} id='adress' onChange={(e) => setInput(e.target.value)} className='input-form' />

            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fafafa" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={() => setBoolean(!boolean)}>
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </div>
        </div>
        <button onClick={confirmBuy} className='button-complete-buy'>Confirmar dirección</button>
      </div>
    </div>
  )
}

export default ModalAdress;