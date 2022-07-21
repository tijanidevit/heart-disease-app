import { useState } from "react";
import { Modal, Button, Text, View } from "native-base";

export const ModalMi = ({ showModal, result, navigation }) => {
  const [showModal2, setShowModal2] = useState(showModal);

  return (
    <Modal isOpen={showModal2} onClose={() => setShowModal2(false)} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Diagnosis Result</Modal.Header>
        <Modal.Body>
          {result === "None" && (
            <View>
              <Text fontSize="xl" color={"success.600"}>
                Congratulations! You have no heart disease.
              </Text>
            </View>
          )}
          {result !== "None" && (
            <View>
              <Text color={"danger.600"} fontSize="xl">
                Sadly, we have detected you with {result}.
              </Text>
              <Text>
                Do not fret. Use the button below to view and select from our
                qualified and expereienced doctors. There is surely a solution
              </Text>
            </View>
          )}
        </Modal.Body>
        <Modal.Footer>
          {result !== "None" && (
            <Button
              bgColor="danger.500"
              flex="1"
              onPress={() => {
                navigation.navigate("DiseasePage", (disease = { result }));
              }}
            >
              Visit Disease Page
            </Button>
          )}

          {result === "None" && (
            <Button
              bgColor="success.500"
              flex="1"
              onPress={() => {
                setShowModal2(false);
              }}
            >
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
