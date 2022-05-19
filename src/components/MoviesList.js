import React from 'react'
function MoviesList(props) {
  const Favourite = props.favouritesComponent
  return (
    <div className='results'>
      {props.movies.map((movie) => (
        <div
          className='row-lg-4 d-flex align-items-stretch result'
          key={movie.id}
        >
          <div className='card' onClick={() => props.openPopup(movie.id)}>
            {movie.poster_path ? (
              <img
                className='card-img-top'
                src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}
                alt='poster'
              />
            ) : (
              <img
                className='card-img-top'
                src={
                  'https://image.tmdb.org/t/p/original/' + movie.profile_path
                }
                alt='poster'
              />
            )}
            <div className='card-body'>
              {movie.title ? (
                <h3 className='card-title'>{movie.title}</h3>
              ) : (
                <h3 className='card-title'>{movie.name}</h3>
              )}
            </div>
          </div>
          <div
            onClick={() => props.handleFavourites(movie)}
            className='overlay'
          >
            <Favourite />
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoviesList
