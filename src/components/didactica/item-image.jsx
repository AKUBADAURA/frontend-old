import React from 'react'

const ItemImage = (props) => {
  return (
    <img  style={{maxHeight:'30rem'}} alt={props.title} title={props.title} src={props.resource}/>
  )
}

export default ItemImage