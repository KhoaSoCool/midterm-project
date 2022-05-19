import React from 'react'

function SearchBox(props) {
  return (
    <div className='col col-sm-4'>
      <input
        className='form-control'
        type='text'
        placeholder='Type to search...'
        onChange={props.handle}
        onKeyPress={props.findMovies}
      />
    </div>
  )
}

export default SearchBox
