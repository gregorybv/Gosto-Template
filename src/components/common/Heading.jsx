import React, { memo } from "react"

export const Heading = memo(({title, desc}) => {
  return (
    <>
      <div className='heading'>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
    </>
  )
});
