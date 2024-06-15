// components/Breadcrumb.js
import React from "react";

const Breadcrumb = ({ selectedPokemon }) => {
  return (
    <ul className="breadcrumb content-center w-full">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a>{selectedPokemon}</a>
      </li>
    </ul>
  );
};

export default Breadcrumb;
