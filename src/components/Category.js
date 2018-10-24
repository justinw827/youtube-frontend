import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

const Category = (props) => {

  return (
      <Button style={{padding: '1em 4em 1em 4em', marginLeft: '1em'}} onClick={props.handleCategory} content={props.name} />
  )
}

export default Category
