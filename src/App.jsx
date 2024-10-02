import { useState, Suspense } from 'react'
import ErrorBoundary from './ErrorBoundary'
import PokemonCard from './components/PokemonCard'
import PokemonGrid from './components/PokemonGrid'
import { PokemonTypeColours } from './utils/pokemonTypeColours'


function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const url = 'https://pokeapi.co/api/v2/pokemon/'




  function handleSelectPokemon(pokemon) {
    return () => {
      setSelectedPokemon(pokemon)
    }
  }

  function checkColour(type) {
    // console.log(type)
    if (type in PokemonTypeColours) {
      // console.log(PokemonTypeColours[type]['medium'])
      return PokemonTypeColours[type]['medium']
    } else {
      return
    }
  }

  function handleImage(pokemon) {
    console.log(pokemon)
  }

  if (selectedPokemon) {
    console.log(selectedPokemon)
    // if (localStorage.getItem(`${pokemon}-image`)) {
    //   setImageUrl(JSON.parse(localStorage.getItem(`${pokemon}-image`)))
    //   console.log('FETCHED image', imageUrl)
    // }
  }

  return (
    <ErrorBoundary fallback={<div>Error...</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          {selectedPokemon ? (
            <PokemonCard imageUrl={imageUrl} checkColour={checkColour} parentUrl={url} selectedPokemon={selectedPokemon} clearHandler={() => setSelectedPokemon(null)} />
          ) : (
            <PokemonGrid checkColour={checkColour} url={url} selectedPokemon={selectedPokemon} handleSelectPokemon={handleSelectPokemon} />
          )}

        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
