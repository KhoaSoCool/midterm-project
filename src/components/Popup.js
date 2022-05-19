import React from 'react'

function Popup(props) {
  return (
    <div className='popup'>
      <div className='content'>
        <h2>
          {props.detail.title} <span>{props.detail.release_date}</span>
        </h2>
        <p className='rating'>
          Genre:{' '}
          {props.detail.genres
            .map((genre) => {
              return genre.name
            })
            .join(', ')
            .replace(/, ([^,]*)$/, ' and $1')}
        </p>
        <p className='rating'>Rating: {props.detail.vote_average}</p>
        <div className='plot'>
          <img
            src={
              'https://image.tmdb.org/t/p/original/' + props.detail.poster_path
            }
            alt='poster'
          ></img>
          <p>{props.detail.overview}</p>
        </div>
        <button className='btn btn-danger' onClick={props.closePopup}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Popup
