import React from 'react'

function TitleHead({name}) {
  return (
    <h1 className="text-[20px] lg:text-[28px] font-bold text-foreground mb-4">
        {name}
    </h1>
  )
}

export default TitleHead