import React from 'react';

const Input = ({placeholder, name, type, onchange,id, value}) => {
  return (
    <input className='h-10 w-full border rounded-md p-2 outline-none' value={value} placeholder={placeholder} type={type} id={id} name={name} onChange={onchange} />
  );
}

export default Input;
