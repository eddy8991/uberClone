/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { icons, images } from "@/assets/constants";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { Link } from "expo-router";
import { useState } from "react";




import { Text, ScrollView, View, Image} from "react-native"


const SignIn = () =>{

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const onSignInPress = async () => {

    }

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[250px]">
                    <Image source={images.signUpCar} className="w-full z-0h-[250px]"/>
                    <Text className="text-2xl text-black font-JakartaBold absolute bottom-5 left-5 left-5">Welcome</Text>
                </View>
                <View className="p-5">
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
                    <CustomButton title="Sign Up" onPress={onSignInPress} className="mt-6"/>

                    <OAuth/>
                    <Link href="/sign-up" className="text-center text-lg text-general-200 mt-10">
                        <Text>Dont have an account?</Text>
                        <Text className="text-primary-500">Sign Up</Text>
                    </Link>
                </View>
                {/* verification modal */}
            </View>
        </ScrollView>
    )
}

export default SignIn;