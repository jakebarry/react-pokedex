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
    console.log(pokemonUrl)

    return (
        // <div className='w-m-[1000px] w-100 mx-0 m-auto flex flex-col gap-[20px]'>
        <div className='flex flex-col gap-[15px] max-w-[800px] m-auto'>
            {/* <div className='w-m-[1000px] w-100 mx-0 m-auto gap-[4px] flex items-center justify-between'> */}
            <div className='mx-auto flex flex-row gap-10'>
                <h1 className='capitalize'>
                    {selectedPokemon}
                </h1>
                <div className='cursor-pointer' onClick={clearHandler}>
                    <i className="fa-regular fa-x"></i>
                </div>
            </div>
            <div className='flex flex-row'>
                {/* Left Column */}
                <div className='w-[50%] h-[80vh] bg-[#78C850] rounded-l-lg'>
                    <img className='w-[400px] my-8' src={data.sprites.front_default} alt={selectedPokemon}></img>
                </div>
                {/* Right column */}
                <div className='w-[50%] h-[80vh] bg-white rounded-r-lg'>
                    {/* First row */}
                    <div className='flex flex-col gap-3'>
                        <h3 className='text-center p-5'>Stats</h3>
                        {data.stats.map((stat, statIndex) => {
                            return (
                                <div className='flex flex-row justify-between ml-5 mr-10' key={statIndex}>
                                    <b className='uppercase'>{stat.stat.name}</b>
                                    <p>{stat.base_stat}</p>
                                </div>
                            )
                        })}
                    </div>
                    {/* Second row */}
                    <div className='p-5'>
                        <h3 className='text-center p-5'>Types</h3>
                        {/* Row of types */}
                        <div className='flex flex-row justify-between mr-5 ml-5'>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
