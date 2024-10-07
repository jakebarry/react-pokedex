import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

async function fetchData(url) {
    const res = await fetch(url);
    return res.json();
}

export default function PokemonCard(props) {
    const { imageUrl, checkColour, selectedPokemon, clearHandler, parentUrl } = props;
    const [data, setData] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const cardParentUrl = 'https://pokeapi.co/api/v2/pokemon/'

    useEffect(() => {
        const fetchPokemonData = async () => {
            setLoading(true);
            const pokemonUrl = `${cardParentUrl}${selectedPokemon}`;
            // const pokemonUrl = `${parentUrl}${selectedPokemon}`;
            // const pokemonUrl = `https://pokeapi.co/api/v2/${selectedPokemon}`;
            console.log(pokemonUrl)
            const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon}`;

            try {
                const [pokemonData, speciesData] = await Promise.all([
                    fetchData(pokemonUrl),
                    fetchData(speciesUrl),
                ]);
                // console.log(pokemonData)
                // console.log(speciesData)
                setData(pokemonData);
                setSpecies(speciesData);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [selectedPokemon, parentUrl]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!data || !species) {
        return <div className="text-center">Error loading Pokémon data.</div>;
    }

    return (
        <div className='flex flex-col gap-[15px] overflow-auto max-w-[800px] mx-auto'>
            <div className='mx-auto flex flex-row gap-10'>
                <div className='cursor-pointer delay-1000 duration-200 hover:animate-spin-once' onClick={clearHandler}>
                    <i className="text-red-500 fa-regular fa-x text-[15px]"></i>
                </div>
            </div>
            <div className='flex flex-row grid grid-cols-2 mx-auto'>
                {/* Left Column */}
                <div className='w-full justify-between bg-white rounded-l-lg mx-auto overflow-hidden'>
                    <div className='flex flex-col'>
                        {console.log(selectedPokemon)}
                        <h1 className='mx-auto text-center text-black mt-3 mb-5 font-semibold capitalize text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
                            {selectedPokemon}
                        </h1>
                        {/* {console.log(data.sprites)} */}
                        {data.sprites && data.sprites.other && (
                            <img className='mx-auto my-auto w-[70px] sm:w-[150px]' 
                                 src={data.sprites.other['official-artwork'].front_default} 
                                 alt={selectedPokemon} />
                        )}
                    </div>
                    <div className='flex flex-row bg-white h-full pt-2 text-xs sm:text-lg justify-center gap-1'>
                        {data && data.types && data.types.length > 0 ? (
                            data.types.map((type, typeIndex) => {
                                return (
                                    <div key={typeIndex}>
                                        <p>
                                            <b className={`uppercase font-semibold text-[${checkColour(type.type.name)}]`}>
                                                {type.type.name}
                                            </b>
                                        </p>
                                    </div>
                                )
                            })
                        ) : (
                            <p>No types available</p>
                        )}
                    </div>
                </div>
                {/* Right column */}
                <div className='w-full bg-white rounded-r-lg mx-auto'>
                    <Tabs
                        defaultActiveKey="about"
                        id="pokemon-details"
                        className=" mb-1 text-xs sm:text-sm justify-center active:font-normal active:no-underline"
                        variant='tabs'
                        justify
                    >
                        <Tab className='p-1' eventKey="about" title="About">
                            <div className='flex flex-wrap w-full'>
                                <h2 className='text-xs sm:text-sm md:text-xl lg:text-2xl ml-1 mt-4 mb-2 font-semibold md:ml-24 sm:ml-20'>Pokémon Data</h2>
                                <h3 className='text-[10px] sm:text-xs ml-1'>
                                    {species.flavor_text_entries.find(text => text.language.name === 'en')?.flavor_text || 'No description available'}
                                </h3>

                                {/* Meta data */}
                                <div className='grid grid-cols-1 mt-4 text-[10px] sm:text-xs gap-2 ml-2'>
                                    <div className='flex flex-row gap-1'>
                                        <p className='font-semibold'>Species:</p>
                                        <p className='capitalize'>{species.genera[7]?.genus || 'Unknown'}</p>
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                        <p className='font-semibold'>Height:</p>
                                        <p>{`0.${data.height} m`}</p>
                                    </div>
                                    <div className='flex flex-row gap-1'>
                                        <p className='font-semibold'>Weight:</p>
                                        <p>{`0.${data.weight} kg`}</p>
                                    </div>
                                    {/* Abilities */}
                                    <div className='flex flex-col sm:flex-row gap-1 mb-3'>
                                        <p className='font-semibold'>Abilities:</p>
                                        {data && data.abilities && data.abilities.length > 0 ? (
                                            data.abilities.map((ability, abilityIndex) => (
                                                <div key={abilityIndex}>
                                                    <p className='text-center capitalize'>{ability.ability.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No abilities available</p>
                                        )}
                                    </div>
                                    <div className='flex flex-col sm:flex-row gap-1 mb-3'>
                                        <p className='font-semibold'>Gender:</p>
                                        <div className='text-center'>
                                            <p>{`♂: ${(1 - species.gender_rate / 8) * 100}%`}</p>
                                            <p>{`♀: ${(species.gender_rate / 8) * 100}%`}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab className='p-1' eventKey="stats" title="Stats">
                            <div className='flex flex-col w-full sm:w-[280px] md:w-[350px] overflow-visible'>
                                <h2 className='text-xs sm:text-sm ml-5 mt-4 mb-2 text-center'>Base Stats</h2>
                                {data && data.stats && data.stats.length > 0 ? (
                                    data.stats.map((stat, statIndex) => (
                                        <div className='flex mb-2 flex-row justify-between text-[10px] sm:text-xs' key={statIndex}>
                                            <b className='uppercase'>{stat.stat.name}</b>
                                            <p>{stat.base_stat}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No stats available</p>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
