import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import SearchInput from '../../components/SearchInput'

import EmptyState from '../../components/EmptyState'
import { useEffect } from 'react'
import { SearchPost } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams } from 'expo-router'
const Search = () => {
    const { query } = useLocalSearchParams()
    // console.log(query)
    const {
        data: posts,
        isLoading,
        refetch,
    } = useAppWrite(() => SearchPost(query))

    useEffect(() => {
        refetch()
    }, [query])
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
                    <View className='my-6 px-4'>
                        <Text className='font-pmedium text-sm text-gray-100'>
                            Search Results
                        </Text>
                        <Text className='text-2xl font-psemibold text-white'>
                            {query}
                        </Text>
                        <View className='mt-6 mb-8'>
                            <SearchInput initialQuery={query} />
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
export default Search
