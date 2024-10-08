
import React, { use, useState } from 'react'
import styles from './pokemongrid.module.css'
import { PokemonTypeColours } from '../utils/pokemonTypeColours'

// Fetch data from Pokemon API 
async function fetchData(url) {
    // console.log(url)
    const res = await fetch(url)
    // console.log(res.json())
    return res.json()
}

// function checkColour(type) {
//     // console.log(type)
//     if (type in PokemonTypeColours) {
//         // console.log(PokemonTypeColours[type]['medium'])
//         return PokemonTypeColours[type]['medium']
//     } else {
//         return
//     }
// }

export default function PokemonGrid(props) {
    const { checkColour, handleSelectPokemon, url, selectedPokemon } = props
    const [search, setSearch] = useState('')
    let data, image

    // const handleChange = (event) => {
    //     setSearch(event.target.value)
    // }

    // Check whether data has already been fetched from API and stored in local cache
    if (localStorage.getItem('pokemon-cards')) {
        data = JSON.parse(localStorage.getItem('pokemon-cards'))
        // console.log('FETCHED FROM CACHE', console.log(data))
    } else {
        // console.log('FETCHED FROM API')
        data = use(fetchData(url))
        localStorage.setItem('pokemon-cards', JSON.stringify(data))
    }
    // console.log(url)
    console.log("Full data\n", data)

    // Cache images
    data.results.map((pokemon, pokemonIndex) => {
        let image = use(fetchData(pokemon.url)).sprites.other['official-artwork'].front_default
        console.log(image)
        console.log(pokemon.url)

        if (localStorage.getItem(`${pokemon.name}-image`)) {
            // console.log('Cache')
        } else {
            // console.log('API')
            localStorage.setItem(`${pokemon.name}-image`, JSON.stringify(image))
        }
    })

    // Return url for pokemon image to display
    function pokeImage(pokemon) {
        // console.log(pokemon)
        // console.log(`${pokemon}-image`)
        // console.log(localStorage.getItem(`${pokemon}-image`))
        return JSON.parse(localStorage.getItem(`${pokemon}-image`))
    }


    function p({ colour, children }) {
        const colourVariants = {
            'grass': 'text-[#78C850]',
            'water': 'text-[#3f3cbb]',
            'fire': 'text-[#F08030]',
            'normal': 'text-[#C4C4A4]',
            'fighting': 'text-[#C03028]',
            'flying': 'text-[#A890F0]',
            'poison': 'text-[#A040A0]',
            'electric': 'text-[#F8D030]',
            'ground': 'text-[#E0C068]',
            'psychic': 'text-[#F85888]',
            'rock': 'text-[#B8A038]',
            'ice': 'text-[#98D8D8]',
            'bug': 'text-[#A8B820]',
            'dragon': 'text-[#7038F8]',
            'ghost': 'text-[#705898]',
            'dark': 'text-[#705848]',
            'steel': 'text-[#B8B8D0]',
            'fairy': 'text-[#EE99AC]',
        }
    }

    return (
        // <div className='flex flex-col gap-[8px] content-center m-0-auto w-100 max-w-[800px]'>
        <div className='flex flex-col gap-[15px] max-w-[800px] m-auto'>
            <h1 className='text-black font-semibold text-2xl text-center'>Pokédex</h1>
            {/* <img className='mx-auto w-100 h-100' src='src/assets/pokédex_logo.png'></img> */}
            <div className='flex flex-col gap-[22px]'>
                {/* <div className='grid-cols-3 gap-[22px]'> */}

                <input type='text' className='px-3 py-1 border bg-white outline-none flex flex-col max-w-[800px] rounded-[5px]' placeholder='Search pokemon...' value={search} onChange={(e) => setSearch(e.target.value)} />
                {/* <input type='text' className='px-3 py-1 border bg-gray-300 outline-none flex flex-col max-w-[800px] rounded-[5px]' placeholder='Search pokemon...' value={search} onChange={handleChange} /> */}


            </div>
            {/* <div className='flex flex-col grid-cols-3 gap-[22px]'> */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[22px]'>
                {data.results.filter(val => {
                    return val.name.includes(search)
                }).map((pokemon, pokemonIndex) => {
                    return (
                        <div onClick={handleSelectPokemon(pokemon.name)} className='bg-white rounded-lg width-100 capitalize duration-200 cursor-pointer hover:mb-[5px] hover:mt-[-5px] hover:shadow-lg border shadow-md text-center' key={pokemonIndex}>
                            <h1 className='font-semibold text-xs sm:text-sm md:text-md lg:text-lg mb-2'>{pokemon.name}</h1>
                            {/* <img className='w-[100px] mx-auto' src={use(fetchData(url + pokemon.name)).sprites.other['official-artwork'].front_default} alt={selectedPokemon}></img> */}
                            {/* <img className='w-[100px] mx-auto' src={getImage(pokemon.name)} alt={selectedPokemon}></img> */}
                            <img className='w-[100px] mx-auto' src={pokeImage(pokemon.name)} alt={selectedPokemon}></img>

                            <div className='flex flex-row text-xs justify-center gap-1'>
                                {use(fetchData(url + pokemon.name)).types.map((type, typeIndex) => {
                                    return (
                                        <div key={typeIndex}>
                                            {/* <p className='uppercase font-medium text-[#3f3cbb]'> */}
                                            {/* Can't use template literal strings to build tailwind classes */}

                                            {/* <p className={`uppercase font-medium text-[${checkColour(type.type.name)}]`}> */}
                                            <p className={`uppercase font-semibold text-[${checkColour(type.type.name)}]`}>

                                                {/* <p className={`${colourVariants[checkColour(type.type.name)]} ...`}>
                                                    {children}
                                                </p> */}

                                                {/* <p className='uppercase font-medium' style={`color-[${checkColour(type.type.name)}]`} > */}
                                                {/* <p className={`uppercase font-medium text-${type.type.name}`}> */}
                                                {/* {console.log(`uppercase font-medium text-[${checkColour(type.type.name)}]`)} */}
                                                {/* {console.log(`uppercase font-medium text-${type.type.name}`)} */}
                                                {type.type.name}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

