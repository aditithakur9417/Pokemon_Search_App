// /hooks/usePokemon.js
import { useState, useEffect } from "react";
import axios from "axios";

const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchTypes = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/type");
      setTypes(res.data.results.map((type) => type.name));
    };

    fetchTypes();
  }, []);

  const fetchPokemon = async (type = "", search = "") => {
    let pokemonData;
    if (type) {
      const typeRes = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      const filteredPokemon = typeRes?.data?.pokemon?.map((obj) => ({
        name: obj.pokemon.name,
        url: obj.pokemon.url,
      }));
      pokemonData = filteredPokemon;
    } else {
      let url = "https://pokeapi.co/api/v2/pokemon?limit=301";
      const res = await axios.get(url);
      pokemonData = res.data.results;
    }

    setPokemonList(pokemonData);
    setFilteredPokemonList(pokemonData);
  };

  const filteredPokemon = async (search = "") => {
    if (search.trim) {
      const filteredPokemon = pokemonList.filter((pokemon) =>
        pokemon.name.includes(search?.toLowerCase())
      );

      setFilteredPokemonList(filteredPokemon);
    }
  };

  const searchPokemon = (type, search) => {
    if (search) {
      let pokemonSerachMatch = pokemonList.find(
        (pokemon) => pokemon.name === search
      );
      if (pokemonSerachMatch) {
        setFilteredPokemonList([pokemonSerachMatch]);
      } else {
        setFilteredPokemonList([]);
      }
    }
  };

  return {
    filteredPokemonList,
    types,
    fetchPokemon,
    filteredPokemon,
    searchPokemon,
  };
};

export default usePokemon;
