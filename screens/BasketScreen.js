import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import Currency from '../components/Currency';
import { getBasketItems, getBasketTotal, removeFromBasket } from '../features/basketSlice';
import { getRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';

const BasketScreen = () => {

  const navigation = useNavigation();
  const restaurant = useSelector(getRestaurant);
  const items = useSelector(getBasketItems);
  const basketTotal = useSelector(getBasketTotal);
  const dispatch = useDispatch();

  const [groupedBasketItems, setGroupedBasketItems] = useState([]);

  useEffect(() => {
    const groupedItems = items.reduce((result, item) => {
      (result[item.id] = result[item.id] || [] ).push(item);
      return result;
    }, {});

    setGroupedBasketItems(groupedItems);
  }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00ccbb" height={50} width={50}/>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white">
          <Image 
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity className="">
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedBasketItems).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text>{items.length} x </Text>

              <Image 
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Currency quantity={items[0]?.price}/>

              <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                <Text className="text-[#00ccbb] text-xs">
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Currency quantity={basketTotal} />
          </View>
        
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Currency quantity={2.99} />
          </View>
   
          <View className="flex-row justify-between">
            <Text className>Order Total</Text>
            <Currency quantity={basketTotal + 2.99} className="font-extrabold"/>
          </View>
        </View>
        
      <TouchableOpacity
        onPress={() => navigation.navigate("PreparingOrderScreen")} 
        className="rounded-lg bg-[#00ccbb] p-4"
      >
        <Text className="text-center text-white text-lg font-bold">
          Place Order
        </Text>
      </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default BasketScreen