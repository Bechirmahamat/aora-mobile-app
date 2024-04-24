import { View, Text, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
const Home = () => {
    return (
        <SafeAreaView className='bg-primary'>
            <FlatList
                data={[]}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Text className='text-whote'>{item.id}</Text>
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-x-6'>
                        <View className='justify-between items flex-row mb-6'>
                            <View>
                                <Text className='font-pmedium text-sm text-gray-100'>
                                    Welcome back!
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    Bechir
                                </Text>
                            </View>
                            <View className='mt-1.5'>
                                <Image
                                    source={images.logoSmall}
                                    resizeMode='contain'
                                    className='w-9 h-10'
                                />
                            </View>
                        </View>

                        <SearchInput />

                        <View className=' bg-red-400'>
                            <Text className=' text-gray-100 font-pregular text-lg'>
                                Latest Videos
                            </Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}
export default Home
