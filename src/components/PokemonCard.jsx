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
    const { imageUrl, checkColour, selectedPokemon, clearHandler, parentUrl } = props
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
        <div className='flex flex-col gap-[15px] overflow-auto max-w-[800px] mx-auto'>
            {/* <div className='w-m-[1000px] w-100 mx-0 m-auto gap-[4px] flex items-center justify-between'> */}
            <div className='mx-auto flex flex-row gap-10'>
                {/* <h1 className='capitalize'>
                    {selectedPokemon}
                </h1> */}
                <div className='cursor-pointer' onClick={clearHandler}>
                    <i className="text-red-500 fa-regular fa-x"></i>
                </div>
            </div>
            <div className='flex flex-row grid grid-cols-2 mx-auto'>
                {/* Left Column */}
                {/* <div className='justify-between w-[50vh] h-[60vh] bg-[#78C850] rounded-l-lg mx-auto overflow-hidden'> */}
                <div className='w-full justify-between bg-[white] rounded-l-lg mx-auto overflow-hidden'>
                    {/* <div className='flex flex-col h-[340px]'> */}
                    <div className='flex flex-col'>
                        {console.log(data.types[0].type.name)}
                        {/* <div className={`w-[50vh] h-[60vh] bg-[${checkColour(data.types[0].type.name)}] rounded-l-lg mx-auto overflow-hidden`}> */}
                        <h1 className='mx-auto text-center text-white mt-1 mb-5 font-bold capitalize text-xl sm:text-2xl md:text-3xl lg:text-4xl'>
                            {selectedPokemon}
                        </h1>
                        {/* <img className='w-[250px] mx-auto my-auto' src={data.sprites.front_default} alt={selectedPokemon}></img> */}
                        {/* {console.log(data.sprites.other['official-artwork'].front_default)} */}

                        {/* <img className='w-[200px] h-[200px] mx-auto my-auto text' src={data.sprites.other['official-artwork'].front_default} alt={selectedPokemon}></img> */}

                        <img className='mx-auto my-auto w-[70px] sm:w-[150px]' src={data.sprites.other['official-artwork'].front_default} alt={selectedPokemon}></img>
                        {/* <img className='mx-auto my-auto w-[70px] sm:w-[150px]' src={imageUrl} alt={selectedPokemon}></img> */}
                    </div>
                    {/* <img className='max-w-full mx-auto my-auto' src={data.sprites.front_default} alt={selectedPokemon}></img> */}
                    <div className='flex flex-row bg-white h-full pt-2 text-xs sm:text-lg justify-center gap-1'>
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
                {/* <div className='w-[50vh] h-[60vh] bg-white rounded-r-lg mx-auto'> */}
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
                                    <h2 className='text-xs sm:text-xl md:text-2xl lg:text-2xl ml-1 mt-4 mb-2 font-semibold md:ml-24 sm:ml-24'>Pokémon Data</h2>
                                    <h3 className='text-[10px] sm:text-sm ml-1'>
                                        {/* English is not always the first entry, need to search for 'eng' language */}
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

                                    {/* Meta data */}
                                    <div className='grid grid-cols-1 mt-4 text-[10px] sm:text-sm gap-2 ml-2'>
                                        <div className='flex flex-row gap-1'>
                                            <p className='font-semibold'>Species:</p>
                                            <p className='capitalize'>{species.genera[7].genus}</p>
                                        </div>
                                        <div className='flex flex-ro gap-1'>
                                            <p className='font-semibold'>Height:</p>
                                            <p className=''>{'0.' + data.height + ' m'}</p>
                                        </div>
                                        <div className='flex flex-row gap-1'>
                                            <p className='font-semibold'>Weight:</p>
                                            <p className=''>{'0.' + data.weight + ' kg'}</p>
                                        </div>
                                        {/* Abilities */}
                                        <div className='flex flex-col sm:flex-row gap-1'>
                                            <p className='font-semibold'>Abilities:</p>
                                            {/* {console.log(data.abilities)} */}
                                            {/* <p className='ml-1 mr-5'>{data.abilities.ability.name}</p> */}

                                            {data.abilities.map((ability, abilityIndex) => {
                                                return (
                                                    <div className='' key={abilityIndex}>
                                                        {/* <div className='flex flex-row justify-between text-[10px]' key={abilityIndex}> */}
                                                        <p className='text-center capitalize'>{ability.ability.name}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className='flex flex-col sm:flex-row gap-1 mb-3'>
                                            <p className='font-semibold'>Gender:</p>
                                            {/* <p className='ml-6 mr-5'>{'M: ' + (1 - species.gender_rate / 8) * 100 + ' F: ' + (species.gender_rate / 8) * 100}</p> */}
                                            {/* <div className='flex flex-row'> */}
                                            <div className='text-center'>
                                                <p className=''>{'♂: ' + (1 - species.gender_rate / 8) * 100 + '%'}</p>
                                                <p className=''>{'♀: ' + (species.gender_rate / 8) * 100 + '%'}</p>
                                            </div>
                                        </div>
                                        {/* <div className='ml-5'>
                                        <p>Species:</p>
                                    </div>
                                    <div className='mr-5 ml-5 capitalize'>
                                        <p>{species.genera[7].genus}</p>
                                    </div> */}
                                    </div>
                                </div>

                            </Tab>
                            {/* Currently, width expands to predetermined widths to match the 'About' tab
                            //  Need to figure out how to dynamically expand */}
                            <Tab className='p-1' eventKey="stats" title="Stats">
                                <div className='flex flex-col w-full w-[250px] sm:w-[280px] md:w-[350px] overflow-visible'>
                                {/* <div className='flex flex-col flex-wrap w-full overflow-visible'> */}
                                    <h2 className='text-xs sm:text-sm ml-5 mt-4 mb-2 text-center'>Base Stats</h2>
                                    {data.stats.map((stat, statIndex) => {
                                        return (
                                            // <div className='flex flex-row justify-between ml-3 mr-3 mb-3 text-[12px] sm:text-sm' key={statIndex}>
                                            // <div className='flex flex-row w-full justify-between text-[12px] sm:text-sm' key={statIndex}>
                                            <div className='flex flex-row justify-between text-[10px] sm:text-sm' key={statIndex}>
                                                <b className='uppercase'>{stat.stat.name}</b>
                                                <p className=''>{stat.base_stat}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>

                    {/* {console.log(species.flavor_text_entries[0].flavor_text)} */}
                    {/* First row */}
                    {/* <div className='flex flex-col gap-1'> */}
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
                    {/* </div> */}
                    {/* Second row */}
                    {/* <div className='p-5'> */}
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
                    {/* </div> */}
            </div>
        </div >
    )
}
