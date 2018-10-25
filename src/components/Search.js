import React from 'react';
import { Input } from 'semantic-ui-react'

const Search = ({handleSearch}) => {
  return (
    <label>
      <Input onChange={handleSearch} style={{width: '45%', fontSize: '20pt'}} size='large' icon='search' placeholder='Search...' /><br /><br />
    </label>
  )
}

export default Search
