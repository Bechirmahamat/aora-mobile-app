import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { useEffect } from 'react'
import { getUserPost, uesLogout } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'

import { useGlobalContext } from '../../GlobalContext'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'
const Profile = () => {
    const { user, setUser, isLogged, setIsLogged } = useGlobalContext()

    const {
        data: posts,
        isLoading,
        refetch,
    } = useAppWrite(() => getUserPost(user?.$id))

    const logout = async () => {
        await uesLogout()
        setUser(null)

        router.replace('/sign-in')
    }

    if (isLoading) return <Text>Loading....</Text>

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                // this for assignment of automatic key
                keyExtractor={(item) => item?.$id}
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
                        <View className='border rounded-lg border-secondary-100 h-16 overflow-hidden w-16'>
                            <Image
                                source={{ uri: user?.avatar }}
                                className='w-full h-full '
                                resizeMode='cover'
                            />
                        </View>
                        <InfoBox
                            title={user?.username}
                            containerStyle={'mt-5'}
                            titleStyle='text-lg'
                        />
                        <View className='mt-5 flex-row'>
                            <InfoBox
                                title={posts?.length || 0}
                                containerStyle={'mr-10'}
                                titleStyle='text-xl'
                                subtitle='posts'
                            />
                            <InfoBox
                                title='1.2k'
                                subtitle='Followers'
                                titleStyle='text-xl'
                            />
                        </View>
                    </View>
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
