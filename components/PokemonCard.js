// /components/PokemonCard.js
import Link from "next/link";

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="flex flex-col bg-white border p-4">
      <div className="self-center">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.url.split("/").slice(-2, -1)[0]
          }.png`}
          alt={pokemon.name}
          style={{ height: "150px", width: "100%" }}
        />
      </div>

      <h2 className="text-left font-semibold">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <Link href={`/pokemon/${pokemon.name}`} className="mt-20">
        <div className="text-blue-500 font-normal">Details</div>
      </Link>
    </div>
  );
};

export default PokemonCard;
