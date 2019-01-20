import React from 'react'

import { Link } from 'react-router-dom' 

const Category = (props) => {
    const { categories } = props
  return (
    <div className="col-3 mt-4">
    <div className="card">
            <div className="card-header bg-custom">
              Categories
            </div>
            <ul className="list-group list-group-flush">
                {categories && categories.map(category => (
                    <Link to={`/category/${category.id}`} className="list-group-item" key={category.id}>{category.categoryName}</Link>
                ))}
             
              <li className="list-group-item">
                    <a href="#" className="btn btn-block btn-primary">HUGE SALE - <strong>100%</strong> Off</a>
              </li>
            </ul>
    </div>
</div>
  )
}

export default Category
