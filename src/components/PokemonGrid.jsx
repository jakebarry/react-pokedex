import React, { use, useState } from 'react'
import styles from './pokemongrid.module.css'
async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

export default function PokemonGrid(props) {
    const {handleSelectPokemon} = props
    const [search, setSearch] = useState('')
    const url = 'https://pokeapi.co/api/v2/pokemon/'
    let data

    if (localStorage.getItem('pokemon-cards')) {
        data = JSON.parse(localStorage.getItem('pokemon-cards'))
        console.log('FETCHED FROM CACHE', console.log(data))
    } else {
        console.log('FETCHED FROM API')
        data = use(fetchData(url))
        localStorage.setItem('pokemon-cards', JSON.stringify(data))
    }

    

    return (
        <div className='flex flex-col gap-[8px] m-0-auto w-100 max-w-[800px]'>
            <h1 className='text-center'>MY POKEMON</h1>
            <div className='flex flex-col gap-[18px]'>
                <input placeholder='Search pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
                {data.results.filter(val => {
                    return val.name.includes(search)
                }).map((pokemon, pokemonIndex) => {
                    return (
                        <div onClick={handleSelectPokemon(pokemon.name)} className='capitalize duration-200 cursor-pointer hover:px-[4px]' key={pokemonIndex}>
                            {pokemon.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
