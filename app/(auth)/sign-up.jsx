import { View, Text, ScrollView, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomBottom from '../../components/CustomBottom'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'
import { useGlobalContext } from '../../GlobalContext'
const SignUp = () => {
    const { user, setUser } = useGlobalContext()
    const [form, setForm] = useState({ email: '', username: '', password: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async () => {
        console.log(form)
        if (!form.email || !form.password || !form.username) {
            Alert.alert('Error', 'Please fill all the fields')
            return
        }
        setIsSubmitting(true)
        try {
            await createUser(form.email, form.password, form.username)
            const result = await getCurrentUser()
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
                        Sign Up to Aora
                    </Text>
                    <FormField
                        title='Username'
                        value={form.username}
                        handleChangeText={(e) =>
                            setForm({ ...form, username: e })
                        }
                        otherStyle='mt-10'
                    />
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
                        title={'Sign Up'}
                        containerStyle={'mt-7'}
                        isLoading={isSubmitting}
                        handlePress={handleSubmit}
                    />
                    <View className='justify-center items-center flex-row pt-5  gap-2'>
                        <Text className='text-lg text-gray-100 tetx=pregular'>
                            Have account already ?
                        </Text>
                        <Link
                            href={'/sign-in'}
                            className='text-lg font-psemibold text-secondary'
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUp
