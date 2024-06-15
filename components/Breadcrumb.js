// components/Breadcrumb.js
import React from "react";

const Breadcrumb = ({ selectedPokemon }) => {
  return (
    <ul className="breadcrumb content-center w-full">
      <li>
        <a className="text-base" href="/">
          Home
        </a>
      </li>
      <li>
        <a className="text-base">{selectedPokemon}</a>
      </li>
    </ul>
  );
};

export default Breadcrumb;
