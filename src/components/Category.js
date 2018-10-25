import React from 'react';
import { Button } from 'semantic-ui-react'

const Category = (props) => {

  return (
      <Button style={{padding: '1em 2em 1em 2em', marginLeft: '0.5em', fontSize: '15pt', borderRadius: '0.35em'}} color='twitter' onClick={props.handleCategory} content={props.name} />
  )
}

export default Category
