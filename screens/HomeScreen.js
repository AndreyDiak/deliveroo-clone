import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import {
  AdjustmentsIcon, ChevronDownIcon,
  SearchIcon, UserIcon
} from "react-native-heroicons/outline";
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from "../sanity";

function HomeScreen () {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restarants[]->{
          ...,
          dishes[]->
        }
      }
    `).then((data) => {
      setFeaturedCategories(data);
    })
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* Header */}

        <View className="flex-row flex-1 pb-3 items-center mx-4 space-x-2">
          <Image 
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <View className="flex-column flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00ccbb" className="hover:cursor-pointer" />
            </Text> 
          </View>
          <UserIcon size={35} color="#00ccbb" />
        </View>

        {/* Search */}
        <View className="flex-row flex-1 items-center space-x-2 pb-2 mx-4">
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
            <SearchIcon color="gray" size={20} />
            <TextInput 
              placeholder="Restaurants and cuisines..." 
              keyboardType="default"
              className="active:border-none active:outline-none border-none outline-none"
            />
          </View>
          <AdjustmentsIcon color="#00ccbb" />
        </View>

        {/* Body */}
        <ScrollView className="bg-gray-100">

          {/* Categories */}
          <Categories />
            
          {/* Featured */}
          {featuredCategories?.map(category => (
            <FeaturedRow 
              key={category._id}
              id={category._id}
              title={category.name}
              desc={category.short_description}
            />
          ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen