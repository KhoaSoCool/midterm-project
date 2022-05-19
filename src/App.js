import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchBox from './components/SearchBox'
import Heading from './components/Heading'
import MoviesList from './components/MoviesList'
import AddFavourites from './components/AddFavourites'
import RemoveFavourites from './components/RemoveFavourites'
import Popup from './components/Popup'

function App() {
  const apiurl =
    'https://api.themoviedb.org/3/search/movie?api_key=ca58eea9207df54e64af4c74a9ad2906&language=en-US&include_adult=true'
  const search = (e) => {
    if (e.key === 'Enter') {
      axios(apiurl + '&query=' + movies.search).then((e) => {
        if (e.request.readyState === 4 && e.request.status === 200) {
          setMovies((prevState) => {
            return { ...prevState, results: [] }
          })
          let movieData = e.data.results
          setMovies((prevState) => {
            return { ...prevState, results: movieData }
          })
          let popular = document.querySelector('#popular')
          popular.classList.add('d-none')
        }
      })
    }
  }
  const getFeature = async () => {
    const feature =
      'https://api.themoviedb.org/3/discover/movie?api_key=ca58eea9207df54e64af4c74a9ad2906&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
    const response = await fetch(feature)
    const responseJson = await response.json()
    setMovies((prevState) => {
      return { ...prevState, results: responseJson.results }
    })
  }
  useEffect(() => {
    getFeature()
  }, [])

  const [movies, setMovies] = useState({
    search: '',
    results: [],
    detail: {},
  })
  const [favourites, setFavourites] = useState([])

  const handleInput = (e) => {
    let searchValue = e.target.value
    setMovies((prevState) => {
      return {
        ...prevState,
        search: searchValue,
      }
    })
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    let uniqueList = [...new Set(newFavouriteList)]
    setFavourites(uniqueList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((fav) => fav.id !== movie.id)
    setFavourites(newFavouriteList)
  }
  const openPopup = (id) => {
    axios(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '?api_key=ca58eea9207df54e64af4c74a9ad2906&language=en-US'
    ).then((e) => {
      setMovies((prevState) => {
        return {
          ...prevState,
          detail: e.data,
        }
      })
    })
    let favourites = document.querySelector('#favourites')
    favourites.classList.add('d-none')
  }

  const closePopup = () => {
    setMovies((prevState) => {
      return {
        ...prevState,
        detail: {},
      }
    })
    let favourites = document.querySelector('#favourites')
    favourites.classList.remove('d-none')
  }
  return (
    <div>
      <header className='container-fluid'>
        <div className='row'>
          <Heading heading='MIDTERM PROJECT' />
          <SearchBox handle={handleInput} findMovies={search} />
        </div>
      </header>
      <div className='container-fluid'>
        <h2 id='popular'>Popular movies</h2>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <MoviesList
            movies={movies.results}
            handleFavourites={addFavouriteMovie}
            favouritesComponent={AddFavourites}
            openPopup={openPopup}
          />
        </div>
      </div>
      {typeof movies.detail.title !== 'undefined' ? (
        <Popup detail={movies.detail} closePopup={closePopup} />
      ) : (
        false
      )}
      <div className='container-fluid'>
        <h2>Favourites</h2>
      </div>
      <div id='favourites' className='container-fluid'>
        <div className='row'>
          <MoviesList
            movies={favourites}
            handleFavourites={removeFavouriteMovie}
            favouritesComponent={RemoveFavourites}
          />
        </div>
      </div>
    </div>
  )
}

export default App
