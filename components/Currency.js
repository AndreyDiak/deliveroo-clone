import { Text, View } from "react-native";
import { CurrencyDollarIcon } from "react-native-heroicons/outline";

const Currency = ( { quantity } ) => (
  <View className="flex-row items-center space-x-1">
     <Text className="text-gray-400">{quantity}</Text>
     <CurrencyDollarIcon color="gray" size={22}/>
  </View>
)

export default Currency;