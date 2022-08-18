import { Text, View, Box } from "native-base";

const s = require("../style");
export const DiseaseCard = ({ disease }) => {
  return (
    <View>
      <Box mt="3">
        <Text fontSize="xl" bold color="black">
          About
        </Text>
        <Text fontSize="sm" color="gray">
          {disease.about}
        </Text>
      </Box>

      <Box mt="3">
        <Text fontSize="xl" bold color="black">
          Cure
        </Text>
        <Text fontSize="sm" color="black">
          {disease.cure}
        </Text>
      </Box>
    </View>
  );
};
