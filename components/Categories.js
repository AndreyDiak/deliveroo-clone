import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import sanityClient from "../sanity"
import CategoryCard from './CategoryCard'

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "category"]
    `).then(data => {
      setCategories(data)
    })
  }, [])

  return (
    <ScrollView 
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal 
      showsHorizontalScrollIndicator={false}
    >
      {categories.map(category => (
        <CategoryCard 
          key={category._id}
          imgUrl={category.image}
          title={category.name}
        /> 
      ))}
    </ScrollView>
  )
}

export default Categories