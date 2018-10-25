import React, { Fragment } from 'react';

import Category from './Category'

const CategoryList = (props) => {
  const categoryNames = ["Sports", "Music", "Movies", "Funny", "News", "Gaming", "Flatiron School"]

  return (
    <Fragment>
      {categoryNames.map(category => <Category key={category} handleCategory={props.handleCategory} name={category} />)}
    </Fragment>
  )
}

export default CategoryList
