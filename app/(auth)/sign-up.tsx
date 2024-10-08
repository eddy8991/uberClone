/* eslint-disable prettier/prettier */
import { images } from "@/assets/constants";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { Link, router } from "expo-router";
import { icons } from "@/assets/constants";
import { useState } from "react";
import { Text, ScrollView, View, Image} from "react-native"
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";


const SignUp = () =>{

    const { isLoaded, signUp, setActive } = useSignUp();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [verification, setVerification] = useState({
      state:'pending',
      error:'',
      code:''
    });    

    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          await signUp.create({
            emailAddress:form.email,
            password:form.password,
          })
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state:'pending'
          })
        } catch (err: any) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          console.error(JSON.stringify(err, null, 2))
        }  
      }
    
      const onPressVerify = async () => {
        if (!isLoaded) return;
    
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code: verification.code, 
          })
    
          if (completeSignUp.status === 'complete') {
            //TODO : Create a database user
            await setActive({ session: completeSignUp.createdSessionId })
            setVerification({...verification, state:'success'})
          } else {
            setVerification({...verification, error:'Verification failed',  state:'failed'}) 
          }
        } catch (err: any) {
          // See https://clerk.com/docs/custom-flows/error-handling
          // for more info on error handling
          setVerification({...verification, error:err.errors[0].longMessage, state:'failed'})
        }
      }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="w-full z-0h-[250px]"/>
                    <Text className="text-2xl text-black font-JakartaBold absolute bottom-5 left-5 left-5">Create your Account</Text>
                </View>
                <View className="p-5">
                    <InputField
                    label="Name"
                    placeholder="Enter your name"
                    icon= {icons.person}
                    value={form.name}
                    onChangeText={(value) => setForm({...form, name: value})}
                    />
                    <InputField
                    label="Email"
                    placeholder="Enter your Email"
                    icon= {icons.email}
                    value={form.email}
                    onChangeText={(value) => setForm({...form, email: value})}
                    />
                    <InputField
                    label="Password"
                    placeholder="Enter your password"
                    icon= {icons.lock}
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(value) => setForm({...form, password: value})}
                    />
                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6"/>

                    <OAuth/>
                    <Link href='/sign-in' className="text-center text-lg text-general-200 mt-10">
                        <Text>Already have an account?</Text>
                        <Text className="text-primary-500">Log in</Text>
                    </Link>
                </View>
            </View>
            <View className="p-5">
                <CustomButton title="Verify" onPress={onPressVerify} className="mt-6" disabled={verification.state === 'pending'}/>
                {verification.state === 'failed' && <Text className="text-center text-lg text-red-500 mt-2">{verification.error}</Text>}  
                <ReactNativeModal isVisible={verification.state === 'success'} >
                  <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                    <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5"/>
                    <Text className="text-center text-3xl font-JakartaBold">Verified</Text>
                    <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">You have successfully verified your account</Text>
                    <CustomButton title="Browse Home" onPress={() => router.replace('/(root)/(tabs)/home')} className="mt-6"/>
                  </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    )
}

export default SignUp;