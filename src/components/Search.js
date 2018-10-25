import React from 'react';
import { Input, Form } from 'semantic-ui-react'

const Search = ({handleSearch}) => {
  return (
    <Form id="login-form" onSubmit={handleSearch}>
      <label>
        <Input style={{width: '45%', fontSize: '20pt'}} size='large' icon='search' placeholder='Search...' /><br /><br />
      </label>
    </Form>
  )
}

export default Search
