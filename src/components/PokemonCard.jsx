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

    return (
        // <div className='w-m-[1000px] w-100 mx-0 m-auto flex flex-col gap-[20px]'>
        <div>
            <div className='w-m-[1000px] w-100 mx-0 m-auto gap-[4px] flex items-center justify-between'>
                <h1 className='capitalize'>
                    {selectedPokemon}
                </h1>
                <div className='cursor-pointer' onClick={clearHandler}>x</div>
            </div>
            <img src={data.sprites.front_default} alt={selectedPokemon}></img>
            <h3>Stats</h3>
            {data.stats.map((stat, statIndex) => {
                return (
                    <div key={statIndex}>
                        <p className='capitalize'>
                            <b>
                                {stat.stat.name}
                            </b>
                            {" " + stat.base_stat}</p>
                    </div>
                )
            })}
            <h3 className='gap-[4px]'>Types</h3>
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
    )
}
