import React from 'react'

function Heading(props) {
  return (
    <div className='col'>
      <a href='/' className='h1'>
        {props.heading}
      </a>
    </div>
  )
}

export default Heading
