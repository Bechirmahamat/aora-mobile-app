import { Text, TouchableOpacity } from 'react-native'
const CustomBottom = ({
    title,
    handlePress,
    containerStyle,
    textStyles,
    isLoading,
}) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            disabled={isLoading}
            className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
                isLoading ? 'opacity-50' : ''
            }`}
        >
            <Text
                className={`text-primary text-lg font-psemibold ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    )
}
export default CustomBottom
