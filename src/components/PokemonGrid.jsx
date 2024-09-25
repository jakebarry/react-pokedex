import React, { use, useState } from 'react'
import styles from './pokemongrid.module.css'

// Fetch data from Pokemon API 
async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

export default function PokemonGrid(props) {
    const { handleSelectPokemon, url, selectedPokemon } = props
    const [search, setSearch] = useState('')
    let data

    // Check whether data has already been fetched from API and stored in local cache
    if (localStorage.getItem('pokemon-cards')) {
        data = JSON.parse(localStorage.getItem('pokemon-cards'))
        console.log('FETCHED FROM CACHE', console.log(data))
    } else {
        console.log('FETCHED FROM API')
        data = use(fetchData(url))
        localStorage.setItem('pokemon-cards', JSON.stringify(data))
    }

    // console.log(url)

    return (
        // <div className='flex flex-col gap-[8px] content-center m-0-auto w-100 max-w-[800px]'>
        <div className='flex flex-col gap-[15px] max-w-[800px] m-auto'>
            <h1 className='text-center uppercase'>Pokédex</h1>
            <div className='flex flex-col gap-[22px]'>
                {/* <div className=''> */}
                {/* <div className='grid-cols-3 gap-[22px]'> */}
                <input className='bg-white border border-black flex flex-col max-w-[800px] rounded-[5px]' placeholder='Search pokemon' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {/* <div className='flex flex-col grid-cols-3 gap-[22px]'> */}
            <div className='grid grid-cols-3 gap-[22px]'>
                {data.results.filter(val => {
                    return val.name.includes(search)
                }).map((pokemon, pokemonIndex) => {
                    return (
                        <div onClick={handleSelectPokemon(pokemon.name)} className='capitalize duration-200 cursor-pointer hover:mb-[5px] hover:mt-[-5px] hover:shadow-md border shadow-sm text-center' key={pokemonIndex}>
                            {pokemon.name}
                            <img className='mx-auto' src={use(fetchData(url + pokemon.name)).sprites.front_default} alt={selectedPokemon}></img>
                            {/* console.log(data) */}
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
