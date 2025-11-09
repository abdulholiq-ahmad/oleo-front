import React from 'react';

function Navbar() {
  const navList = ['Asosiy', 'Biz haqimizda', 'Mahsulotlar', 'Yangiliklar'];
  return (
    <ul className="flex flex-row gap-4">
      {navList.map((item, index) => (
        <li key={index} className="px-6.5">
          <p className="text-[18px] text-black">{item}</p>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
