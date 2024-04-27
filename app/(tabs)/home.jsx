import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { useState } from 'react'
import { getAllPost, getLatestPost } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'
const Home = () => {
    const { data: posts, isLoading, refetch } = useAppWrite(getAllPost)
    const { data: LatestPosts, isLoading: isFetchingLatest } =
        useAppWrite(getLatestPost)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }
    if (isLoading || isFetchingLatest) return <Text>Loading....</Text>
    // console.log(posts)
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
                    <View className='my-6 px-4 -y-6'>
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

                        <View className='w-full flex-1 pt-5  pb-8'>
                            <Text className='mb-3 text-gray-100 font-pregular text-lg'>
                                Latest Videos
                            </Text>
                            <Trending posts={LatestPosts ?? []} />
                        </View>
                    </View>
                )}
                // if list has not item what we should display
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No videos found !'
                        subtitle='Be the first one to upload a video '
                    />
                )}
                // apply refresh functionality when we scroll to the top
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <StatusBar style='light' />
        </SafeAreaView>
    )
}
export default Home
