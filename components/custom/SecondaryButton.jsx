import React from 'react'

function SecondaryButton({content , style , onClick}) {
  return (
    <button onClick={onClick} className={`border-cPrimary border-2 text-cPrimary cursor-pointer rounded-lg font-bold px-3.5 ${style}`}   >{content}</button>
  )
}

export default SecondaryButton