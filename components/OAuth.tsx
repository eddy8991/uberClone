import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { icons } from "@/assets/constants";

const OAuth = () => {
  const handleGoogleSignIn = () => {};

  return (
    <View>
      <View className="flex mt-4 gap-x-3 flex-row justify-center items-center">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Sign in with Google"
        className="mt-5 w-full shadow-none "
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;