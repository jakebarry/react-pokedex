import React, { use } from 'react'
// import Tabs from './Tabs'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css'

async function fetchData(url) {
    const res = await fetch(url)
    return res.json()
}

export default function PokemonCard(props) {
    const { checkColour, selectedPokemon, clearHandler, parentUrl } = props
    const pokemonUrl = parentUrl + selectedPokemon
    const data = use(fetchData(pokemonUrl))
    // console.log(data)
    // console.log(pokemonUrl)
    const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species/' + selectedPokemon
    const species = use(fetchData(speciesUrl))
    // console.log(speciesUrl)

    const tabData = [
        { label: 'Tab 1' },
        { label: 'Tab 2' },
        { label: 'Tab 2' },
    ]

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
                <div className='justify-between w-[50vh] h-[60vh] bg-[#78C850] rounded-l-lg mx-auto overflow-hidden'>
                    <div className='flex flex-col h-[340px]'>
                        {console.log(data.types[0].type.name)}
                        {/* <div className={`w-[50vh] h-[60vh] bg-[${checkColour(data.types[0].type.name)}] rounded-l-lg mx-auto overflow-hidden`}> */}
                        <h1 className='mx-auto text-center text-white mt-5 font-bold text-3xl capitalize'>
                            {selectedPokemon}
                        </h1>
                        {/* <img className='w-[250px] mx-auto my-auto' src={data.sprites.front_default} alt={selectedPokemon}></img> */}
                        {/* {console.log(data.sprites.other['official-artwork'].front_default)} */}
                        <img className='w-[200px] h-[200px] mx-auto my-auto' src={data.sprites.other['official-artwork'].front_default} alt={selectedPokemon}></img>
                    </div>
                    {/* <img className='max-w-full mx-auto my-auto' src={data.sprites.front_default} alt={selectedPokemon}></img> */}
                    <div className='flex flex-row justify-center gap-4 bg-white h-full pt-2'>
                        {data.types.map((type, typeIndex) => {
                            return (
                                <div key={typeIndex}>
                                    <p>
                                        <b className={`uppercase font-semibold text-[${checkColour(type.type.name)}]`}>
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
                    <div>
                        <Tabs
                            defaultActiveKey="about"
                            id="pokemon-details"
                            className="mb-1 text-xs justify-center active:font-normal active:no-underline"
                            variant='tabs'
                            justify

                        >
                            <Tab className='p-1' eventKey="about" title="About">
                                <h2 className='text-sm ml-5 mt-4 mb-2 font-semibold'>Pokémon Data</h2>
                                <h3 className='text-xs ml-5'>
                                    {species.flavor_text_entries[0].flavor_text}
                                    {/* {console.log(species.flavor_text_entries)} */}

                                    {species.flavor_text_entries.map((language, languageIndex) => {
                                        console.log(language.language.name)
                                        if (language.language.name === 'eng') {
                                            // console.log(language.language)
                                        }
                                    })}


                                    {/* Find english language description */}
                                    {/* {
                                        species.flavor_text_entries.find(
                                            (text) => text.language.name === "en"
                                        )?.flavorText
                                    } */}
                                </h3>
                                <div className='flex flex-col mx-auto text-left mt-4 text-xs gap-2'>
                                    <div className='flex flex-row'>
                                        <p className='ml-5'>Species:</p>
                                        <p className='ml-5 mr-5 capitalize'>{species.genera[7].genus}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='ml-5'>Height:</p>
                                        <p className='ml-6 mr-5'>{'0.' + data.height + ' m'}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='ml-5'>Weight:</p>
                                        <p className='ml-6 mr-5'>{'0.' + data.weight + ' kg'}</p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='ml-5'>Abilities:</p>
                                        {/* {console.log(data.abilities)} */}
                                        {/* <p className='ml-5 mr-5'>{data.abilities.ability.name}</p> */}

                                        {data.abilities.map((ability, abilityIndex) => {
                                            return (
                                                <div className='flex flex-row justify-between ml-5 mr-5' key={abilityIndex}>
                                                    <p className='text-xs capitalize'>{ability.ability.name}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='flex flex-row'>
                                        <p className='ml-5'>Gender:</p>
                                        {/* <p className='ml-6 mr-5'>{'M: ' + (1 - species.gender_rate / 8) * 100 + ' F: ' + (species.gender_rate / 8) * 100}</p> */}
                                        <div className='flex flex-row'>
                                            <p className='ml-5 mr-5'>{'♂: ' + (1 - species.gender_rate / 8) * 100 + '%'}</p>
                                            <p className='ml-7 mr-5'>{'♀: ' + (species.gender_rate / 8) * 100 + '%'}</p>
                                        </div>
                                    </div>
                                    {/* <div className='ml-5'>
                                        <p>Species:</p>
                                    </div>
                                    <div className='mr-5 ml-5 capitalize'>
                                        <p>{species.genera[7].genus}</p>
                                    </div> */}
                                </div>
                            </Tab>
                            <Tab className='p-1' eventKey="stats" title="Stats">
                                <h2 className='text-sm ml-5 mt-4 mb-2 text-center'>Base Stats</h2>
                                {data.stats.map((stat, statIndex) => {
                                    return (
                                        <div className='flex flex-row justify-between ml-5 mr-5 mb-3' key={statIndex}>
                                            <b className='text-xs uppercase'>{stat.stat.name}</b>
                                            <p className='text-xs'>{stat.base_stat}</p>
                                        </div>
                                    )
                                })}
                            </Tab>
                        </Tabs>
                    </div>

                    {/* {console.log(species.flavor_text_entries[0].flavor_text)} */}
                    {/* First row */}
                    <div className='flex flex-col gap-1'>
                        {/* <h1 className='text-center mt-4 font-medium text-lg'>Data</h1>
                    <h3 className='text-xs ml-5'>{species.flavor_text_entries[0].flavor_text}</h3>
                    <h2 className='text-sm ml-5 mt-4 mb-2'>Base Stats</h2>
                    {data.stats.map((stat, statIndex) => {
                        return (
                            <div className='flex flex-row justify-between ml-5 mr-5 mb-3' key={statIndex}>
                                <b className='text-xs uppercase'>{stat.stat.name}</b>
                                <p className='text-xs'>{stat.base_stat}</p>
                            </div>
                        )
                    })} */}
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
        </div >
    )
}
