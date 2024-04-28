import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomBottom from '../../components/CustomBottom'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../GlobalContext'
const SignIn = () => {
    const { user, setUser } = useGlobalContext()
    const [form, setForm] = useState({ email: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill all the fields')
            return
        }
        setIsSubmitting(true)
        try {
            const result = await signIn(form.email, form.password)
            setUser(result)
            router.replace('/home')
        } catch (error) {
            Alert.alert('Error', error.message)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className='w-[115px] h-[35px]'
                    />
                    <Text className='text-2xl text-white text-semibold mt-10 font-psemibold '>
                        Log in to Aora
                    </Text>
                    <FormField
                        title='Email'
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyle='mt-7'
                        keyBoardType='email-address'
                    />
                    <FormField
                        title='Password'
                        value={form.password}
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyle='mt-7'
                    />
                    <CustomBottom
                        title={'Sign In'}
                        containerStyle={'mt-7'}
                        isLoading={isSubmitting}
                        handlePress={handleSubmit}
                    />
                    <View className='justify-center pt-5 flex-row gap-2 items-center'>
                        <Text className='text-lg text-gray-100 text-pregular'>
                            Don't have account ?
                        </Text>
                        <Link
                            href={'/sign-up'}
                            className='text-lg font-psemibold text-secondary'
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn
