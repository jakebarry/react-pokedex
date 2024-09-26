import React, { use } from 'react'

async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

export default function PokemonCard(props) {
    const { selectedPokemon, clearHandler, parentUrl } = props
    const pokemonUrl = parentUrl + selectedPokemon
    const data = use(fetchData(pokemonUrl))
    // console.log(data)
    // console.log(pokemonUrl)
    const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + selectedPokemon
    const species = use(fetchData(speciesUrl))
    // console.log(speciesUrl)

    return (
        // <div className='w-m-[1000px] w-100 mx-0 m-auto flex flex-col gap-[20px]'>
        // <div className='flex flex-col gap-[15px] max-w-[800px] m-auto'>
        <div className='flex flex-col gap-[15px]'>
            {/* <div className='w-m-[1000px] w-100 mx-0 m-auto gap-[4px] flex items-center justify-between'> */}
            <div className='mx-auto flex flex-row gap-10'>
                {/* <h1 className='capitalize'>
                    {selectedPokemon}
                </h1> */}
                <div className='cursor-pointer' onClick={clearHandler}>
                    <i className="fa-regular fa-x"></i>
                </div>
            </div>
            <div className='flex flex-row mx-auto'>
                {/* Left Column */}
                <div className='w-[50vh] h-[60vh] bg-[#78C850] rounded-l-lg mx-auto'>
                    <h1 className='mx-auto text-center text-white mt-5 font-bold text-3xl capitalize'>
                        {selectedPokemon}
                    </h1>
                    <img className='w-[250px]  mx-auto my-auto' src={data.sprites.front_default} alt={selectedPokemon}></img>
                    <div className='flex flex-row justify-center gap-4'>
                        {data.types.map((type, typeIndex) => {
                            return (
                                <div className='' key={typeIndex}>
                                    <p>
                                        <b className='capitalize'>
                                            {type.type.name}
                                        </b>
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {/* Right column */}
                <div className='w-[50vh] h-[60vh] bg-white rounded-r-lg mx-auto'>
                    {console.log(species.flavor_text_entries[0].flavor_text)}
                    {/* First row */}
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-center mt-4 font-medium text-lg'>Data</h1>
                        <h3 className='text-xs ml-5'>{species.flavor_text_entries[0].flavor_text}</h3>
                        <h2 className='text-sm ml-5 mt-4 mb-2'>Base Stats</h2>
                        {data.stats.map((stat, statIndex) => {
                            return (
                                <div className='flex flex-row justify-between ml-5 mr-5 mb-3' key={statIndex}>
                                    <b className='text-xs uppercase'>{stat.stat.name}</b>
                                    <p className='text-xs'>{stat.base_stat}</p>
                                </div>
                            )
                        })}
                    </div>
                    {/* Second row */}
                    <div className='p-5'>
                        {/* <h3 className='text-center p-5'>Types</h3> */}

                        {/* Row of types */}
                        {/* <div className='flex flex-row justify-between mr-5 ml-5'>
                            {data.types.map((type, typeIndex) => {
                                return (
                                    <div key={typeIndex}>
                                        <p>
                                            <b className='capitalize'>
                                                {type.type.name}
                                            </b>
                                        </p>
                                    </div>
                                )
                            })}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
