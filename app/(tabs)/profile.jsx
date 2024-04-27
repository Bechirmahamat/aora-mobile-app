import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { useEffect } from 'react'
import { getUserPost } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'

import { useGlobalContext } from '../../GlobalContext'
import { icons } from '../../constants'
const Profile = () => {
    const { user, setUser, isLogged, setIsLogged } = useGlobalContext()
    const {
        data: posts,
        isLoading,
        refetch,
    } = useAppWrite(() => getUserPost(user.$id))
    const logout = () => {}
    if (isLoading) return <Text>Loading....</Text>

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                // this for assignment of automatic key
                keyExtractor={(item) => item.$id}
                // render the data

                renderItem={({ item }) => <VideoCard video={item} />}
                // this is basically the header of the list
                ListHeaderComponent={() => (
                    <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <TouchableOpacity
                            className='w-full items-end mb-10 '
                            onPress={logout}
                        >
                            <Image
                                source={icons.logout}
                                className='w-6 h-6'
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <View className='border rounded-lg border-secondary-200 h-16 overflow-hidden w-16'>
                            <Image
                                source={{ uri: user?.avatar }}
                                className='w-full h-full '
                                resizeMode='cover'
                            />
                        </View>
                    </View>
                    // <View className='my-6 flex-col justify-center items-center relative'>
                    //     <View className='border rounded-lg border-secondary-200 h-16 overflow-hidden w-16'>
                    //         <Image
                    //             source={{ uri: user.avatar }}
                    //             className='w-full h-full '
                    //             resizeMode='contain'
                    //         />
                    //     </View>
                    //     <Text className='text-xl font-psemibold capitalize my-1 text-white'>
                    //         {user.username}
                    //     </Text>
                    //     <View className='flex-row gap-5 '>
                    //         <View className='flex-col items-center justify-center'>
                    //             <Text className='text-3xl font-semibold text-white'>
                    //                 10
                    //             </Text>
                    //             <Text className='text-lg text-white'>
                    //                 Posts
                    //             </Text>
                    //         </View>
                    //         <View className='flex-col items-center justify-center'>
                    //             <Text className='text-3xl font-semibold text-white'>
                    //                 1.2K
                    //             </Text>
                    //             <Text className='text-lg text-white'>
                    //                 Views
                    //             </Text>
                    //         </View>
                    //     </View>
                    // </View>
                )}
                // if list has not item what we should display
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No videos found !'
                        subtitle='no video found for this Query'
                    />
                )}
                // apply refresh functionality when we scroll to the top
            />
            <StatusBar style='light' />
        </SafeAreaView>
    )
}
export default Profile
