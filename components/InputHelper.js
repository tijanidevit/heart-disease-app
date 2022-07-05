import { Text } from "native-base";

const InputHelper = ({ text }) => {
  return (
    <Text color={"danger.400"} fontSize="sm">
      {text}
    </Text>
  );
};

export default InputHelper;
