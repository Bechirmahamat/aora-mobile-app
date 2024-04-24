import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { icons, images } from '../constants'
const SearchInput = ({
    handleChangeText,
    title,
    value,
    otherStyle,
    keyBoardType,
    placeholder,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className='border-2 flex-row border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary space-x-4  items-center'>
            <TextInput
                className='mt-0.5 text-white flex-1 font-pregular text-base'
                value={value}
                placeholder={'Search for a video topic'}
                placeholderTextColor={'#7b7b8b'}
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}
export default SearchInput
