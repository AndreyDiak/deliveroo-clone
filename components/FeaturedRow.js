import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestarauntCard from './RestarauntCard'
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, desc}) => {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(
      `
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `, 
    { id }
    ).then((data) => {
      setRestaurants(data?.restaurants);
    })
  }, [])

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00ccbb"/>
      </View>

      <Text className="text-xs text-gray-500 px-4">{desc}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15
        }}
        showsHorizontalScrollIndicator={false}
        className="p-4"
      >
        {
          restaurants?.map(restaurant => (
            <RestarauntCard 
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          ))
        }
      </ScrollView>

    </View>
  )
}

export default FeaturedRow