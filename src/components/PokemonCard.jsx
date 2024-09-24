import React, {use} from 'react'

export default function PokemonCard(props) {
    const { selectedPokemon, clearHandler } = props
    return (
        <div className='w-m-[1000px] w-100 mx-0 m-auto flex flex-col gap-[20px]'>
            <div className='flex items-center justify-between'>
                <h4 className='capitalize'>
                    {selectedPokemon}
                </h4>
                <div className='cursor-pointer' onClick={clearHandler}>x</div>
            </div>

        </div> 
    )
}
