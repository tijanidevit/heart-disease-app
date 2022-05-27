import { Text, HStack, IconButton, Box, Icon } from "native-base";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const s = require("../style");
export const Header = ({ navigation, title }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <>
      <HStack
        bg="#E11D48"
        px="6"
        py="0"
        shadow={6}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        style={s.footer}
      >
        <HStack alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={MaterialCommunityIcons}
                name="account"
                size="lg"
                color="white"
              />
            }
            onPress={() => navigateTo("Profile")}
          />
          <Box bg="white" padding="0" borderRadius="50">
            <IconButton
              icon={
                <Icon
                  as={AntDesign}
                  name="logout"
                  size="md"
                  style={s.textRed}
                />
              }
              onPress={async () => {
                await AsyncStorage.removeItem("userToken");
                navigateTo("Login");
              }}
            />
          </Box>
        </HStack>
      </HStack>
    </>
  );
};
