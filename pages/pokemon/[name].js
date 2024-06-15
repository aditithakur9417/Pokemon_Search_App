// /pages/pokemon/[name].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import loaderGif from "../../assets/loader.gif";
import Breadcrumb from "@/components/Breadcrumb";
import axios from "axios";

const PokemonDetails = () => {
  const router = useRouter();
  const { name } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (name) {
      setLoader(true);
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
        setPokemon(res.data);
      });
    }
  }, [name]);

  if (!pokemon || loader) {
    setTimeout(() => {
      setLoader(false);
    }, 500);
    return (
      <div className="h-screen flex items-center justify-center">
        {" "}
        <img src={loaderGif.src} alt="Loading..." style={{ height: "100px" }} />
      </div>
    );
  }
  return (
    <div className="p-1 text-base h-screen flex flex-col justify-center gap-[15%]">
      <div className="flex">
        <a href="javascript:history.back()" className="text-blue-500 font-bold">
          <button className="text-base bg-blue-500 hover:bg-blue-600 h-full text-white px-5 rounded-l-md ">
            Back
          </button>
        </a>
        <Breadcrumb selectedPokemon={pokemon.name} />
      </div>
      <div className="h-screen ">
        <div className="max-w-xs mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-l hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="bg-[#60E2C9] p-4">
            <img
              className="h-40 w-full object-contain"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              style={{ height: "200px", width: "100%" }}
            />
          </div>
          <div className="p-4 bg-[#FDC666]">
            <p>
              <strong>Name:</strong>{" "}
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
              <strong>Stats:</strong>{" "}
              {pokemon.stats.map((t) => t.stat.name).join(", ")}
            </p>
            <p>
              <strong>Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
            <p>
              <strong>Moves:</strong>{" "}
              {pokemon.moves
                .slice(0, 6)
                .map((move) => move.move.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
