import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { XIcon } from 'react-native-heroicons/outline'
import MapView, { Marker } from 'react-native-maps'
import * as Progress from 'react-native-progress'
import { useSelector } from 'react-redux'
import { getRestaurant } from '../features/restaurantSlice'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(getRestaurant)

  return (
    <View className="bg-[#00ccbb] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center px-4 py-8">
          <TouchableOpacity 
            onPress={() => navigation.navigate("Home")}
            className=""
            >
            <XIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help!</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-3xl font-bold">45-55 Minutes</Text>
            </View>
            <Image 
              source={{uri: "https://links.papareact.com/fls"}}
              className="h-20 w-20"
            />
          </View>

          <Progress.Bar size={30} color="#00ccbb" indeterminate={true} />

          <Text className="mt-3 text-gray-500">
            Your order at {restaurant.title} is being prepared
          </Text>

        </View>
      </SafeAreaView>
      
      {/* Something wrong with react-native-maps... */}

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 z-0 -mt-10"
        mapType='mutedStandart'
      >
        <Marker 
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor='#00ccbb'
        />
      </MapView>

      <SafeAreaView className="bg-white flex-row items-center spacex-x-5 h-28">
        <Image 
          source={{
            uri: "https://links.papareact.com/wru" 
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full mx-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Andrey Diakov</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>

        <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen