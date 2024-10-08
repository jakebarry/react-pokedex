import React, { useState, useEffect } from 'react';
import styles from './pokemongrid.module.css';
import { PokemonTypeColours } from '../utils/pokemonTypeColours';

// Fetch data from Pokemon API
async function fetchData(url) {
    const res = await fetch(url);
    return res.json();
}

export default function PokemonGrid(props) {
    const { checkColour, handleSelectPokemon, url, selectedPokemon } = props;
    const [search, setSearch] = useState('');
    const [data, setData] = useState(null); // State to store fetched Pokemon data
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const itemsPerPage = 20 // Set the number of Pokemon to load 

    // Fetch the main Pokemon list and cache in localStorage
    useEffect(() => {
        if (localStorage.getItem('pokemon-cards')) {
            setData(JSON.parse(localStorage.getItem('pokemon-cards')));
            setLoading(false);
        } else {
            fetchData(url)
                .then(data => {
                    localStorage.setItem('pokemon-cards', JSON.stringify(data));
                    setData(data);
                    setLoading(false);
                })
                .catch(error => console.error(error));
        }
    }, [url]);

    // Cache each Pokemon's image in localStorage
    useEffect(() => {
        if (data && data.results) {
            data.results.forEach(async (pokemon) => {
                if (!localStorage.getItem(`${pokemon.name}-image`)) {
                    const pokemonData = await fetchData(pokemon.url);
                    const image = pokemonData.sprites.other['official-artwork'].front_default;
                    localStorage.setItem(`${pokemon.name}-image`, image);
                }
            });
        }
    }, [data]);

    // Helper function to get cached Pokemon image
    // Need to check if localstore exists, and if not, then fetch data
    // Or only render after local storage is set
    function pokeImage(pokemonName) {
        // console.log(localStorage.getItem(`${pokemonName}-image`))
        return localStorage.getItem(`${pokemonName}-image`);
    }

    if (loading) return <p>Loading...</p>;

    // Calculate the Pokemon to display
    const filteredData = data.results.filter(val => val.name.includes(search));
    // E.g. (1*20, 2*20), (2*20, 3*20)
    const displayedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

    return (
        <div className='flex flex-col gap-[15px] max-w-[800px] m-auto'>
            <h1 className='text-black font-semibold text-2xl text-center'>Pokédex</h1>
            <div className='flex flex-col gap-[22px]'>
                <input
                    type='text'
                    className='px-3 py-1 border bg-white outline-none flex flex-col max-w-[800px] rounded-[5px]'
                    placeholder='Search pokemon...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[22px]'>
                {displayedData.map((pokemon, pokemonIndex) => {
                        return (
                            <div
                                onClick={handleSelectPokemon(pokemon.name)}
                                className='bg-white rounded-lg width-100 capitalize duration-200 cursor-pointer hover:mb-[5px] hover:mt-[-5px] hover:shadow-lg border shadow-md text-center'
                                key={pokemonIndex}
                            >
                                <h1 className='font-semibold text-xs sm:text-sm md:text-md lg:text-lg mb-2'>
                                    {pokemon.name}
                                </h1>
                                <img
                                    className='w-[100px] mx-auto'
                                    src={pokeImage(pokemon.name)}
                                    alt={selectedPokemon}
                                />
                                <div className='flex flex-row text-xs justify-center gap-1'>
                                    {pokemon.types &&
                                        pokemon.types.map((type, typeIndex) => {
                                            return (
                                                <div key={typeIndex}>
                                                    <p
                                                        className={`uppercase font-semibold text-[${checkColour(type.type.name)}]`}
                                                    >
                                                        {type.type.name}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        );
                    })}
            </div>
            {filteredData.length > (currentPage + 1) * itemsPerPage && (
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Load more
                </button>
            )}
            {currentPage > 6 && (
                <button
                    onClick={() => setCurrentPage(0)}
                    className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
                >
                    Load again
                </button>
            )}
            
        </div>
    );
}
