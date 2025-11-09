import React from 'react';

function Navbar() {
  const navList = ['Asosiy', 'Biz haqimizda', 'Mahsulotlar', 'Yangiliklar'];
  return (
    <ul className="flex flex-row gap-4">
      {navList.map((item) => (
        <li className="px-6.5">{item}</li>
      ))}
    </ul>
  );
}

export default Navbar;
