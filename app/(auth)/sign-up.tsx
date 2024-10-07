/* eslint-disable prettier/prettier */
import { images } from "@/assets/constants";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { Link } from "expo-router";
import { useState } from "react";




import { Text, ScrollView, View, Image} from "react-native"


const SignUp = () =>{

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onSignUpPress = async () => {

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
                    palceholder="Enter your name"
                    icon= {icons.person}
                    value={form.name}
                    onChangeText={(value) => setForm({...form, name: value})}
                    />
                    <InputField
                    label="Email"
                    palceholder="Enter your Email"
                    icon= {icons.email}
                    value={form.email}
                    onChangeText={(value) => setForm({...form, email: value})}
                    />
                    <InputField
                    label="Password"
                    palceholder="Enter your password"
                    icon= {icons.lock}
                    value={form.password}
                    secureTextEntry={true}
                    onChangeText={(value) => setForm({...form, password: value})}
                    />
                    <CustomButton title="Sign Up" onPress={onSignUpPress} className="mt-6"/>

                    <OAuth/>
                    <Link href='/sign-in/>' className="text-center text-lg text-general-200 mt-10">
                        <Text>Already have an account?</Text>
                        <Text className="text-primary-500">Log in</Text>
                    </Link>
                </View>
                {/* verification modal */}
            </View>
        </ScrollView>
    )
}

export default SignUp;