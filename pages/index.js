// /pages/index.js
import { useEffect, useState } from "react";
import SearchForm from "../components/SearchForm";
import PokemonCard from "../components/PokemonCard";
import loaderGif from "../assets/loader.gif";
import usePokemon from "../custom_hooks/usePokemon";

const Home = () => {
  const {
    filteredPokemonList,
    types,
    fetchPokemon,
    filteredPokemon,
    searchPokemon,
  } = usePokemon();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemon().then(() => setLoading(false));
  }, []);

  const handleSearch = (type, search, filterSearch = false) => {
    if (filterSearch) {
      filteredPokemon(search);
    } else {
      searchPokemon(type, search);
    }
  };

  const handleTypeFilter = (type, search) => {
    fetchPokemon(type, search);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        {" "}
        <img src={loaderGif.src} alt="Loading..." style={{height:'100px'}}/>
      </div>
    );
  }
  return (
    <div className="p-4">
      <SearchForm
        types={types}
        onSearch={handleSearch}
        filterByType={handleTypeFilter}
      />
      {filteredPokemonList?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredPokemonList?.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="mt-2">
          <p>No Pokemon found with mentioned details.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
