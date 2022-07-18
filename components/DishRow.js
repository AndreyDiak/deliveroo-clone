import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { CurrencyDollarIcon, MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { addToBasket, getBasketItems, getBasketItemsWithId, removeFromBasket } from '../features/basketSlice';
import { useDispatch, useSelector } from "react-redux"
import Currency from "../components/Currency"

const DishRow = ({ id, name, description, price, image }) => {

  const dispatch = useDispatch();
  const [isPressed, setIsPressed] = useState(false)
  const items = useSelector((state) => getBasketItemsWithId(state, id))

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }))
  }

  const removeItemFromBasket = () => {
    if(!items.length > 0 ) return;
    dispatch(removeFromBasket({id}))
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)} 
        className={`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Currency quantity={price}/>
          </View>

          <View className="">
            <Image
              source={{uri: urlFor(image).url()}}
              className="h-20 w-20 bg-gray-300 p-4 border border-[#f3f3f3]"
            />
          </View>
        </View>
      </TouchableOpacity>
      {
        isPressed && (
          <View className="bg-white px-4">
            <View className="flex-row items-center space-x-2 pb-3">
              <TouchableOpacity
                disabled={!items.length} 
                onPress={removeItemFromBasket}
              >
                <MinusCircleIcon 
                  size={40} 
                  color={items.length > 0 ? "#00ccbb" : "gray"}
                  />
              </TouchableOpacity>
              <Text>{items.length}</Text>
              <TouchableOpacity onPress={addItemToBasket} >
                <PlusCircleIcon  size={40} color="#00ccbb" />
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </View>

  )
}

export default DishRow;