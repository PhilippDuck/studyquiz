import React from 'react'
import {
  Card, IconButton, ButtonGroup, Flex, HStack, Heading, CardHeader, CardBody, CardFooter, Button, VStack, Spacer, Text, Box, AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Spinner
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useRealm } from "../provider/RealmProvider";
import { useEffect, useState } from 'react';
import { DeleteIcon } from "@chakra-ui/icons";

function QuizCard(props) {


  const app = useRealm();
  const [owner, setOwner] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  useEffect(() => {
    async function getNicknameById() {
      if (app.currentUser) {
        const result = await app.currentUser.functions.getNicknameById({ id: props.quiz.owner }); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
        //console.log('Ergebnis der Funktion:', result);
        return result;
      } else {
        console.log("errr");
      }

    }
    getNicknameById().then(e => {
      setOwner(e);
    });
  }, [])

  async function handleDelete() {
    setDeleteIsLoading(true);
    await props.deleteQuiz(props.quiz._id);
    setDeleteIsLoading(false);
    onClose();
  }


  return (
    <Box w="100%">

      <Card variant={"outline"} _hover={{ border: "1px", cursor: "pointer" }} size="sm" w="100%" direction={{ base: 'column', sm: 'row' }}>
        <CardHeader w="100%">
          <Flex >
            <Box flex="1">
              <Link to={"/play"} state={{quizId: props.quiz._id.toString(), questions: props.quiz.questions }} >

                <VStack spacing={"2px"} align={"start"} minW="100%">

                  <Heading size="sm">{props.quiz.title}</Heading>
                  <Text fontSize={"sm"}>{props.quiz.questions.length + (props.quiz.questions.length === 1 ? " Frage" : " Fragen")}</Text>
                  <Text color="gray" fontSize={"xs"}>{`Ersteller: ${owner}`}</Text>


                </VStack>


              </Link>
            </Box>
            {props.quiz.owner === app.currentUser.id ?
              <IconButton size={"sm"} onClick={onOpen} icon={<DeleteIcon />} /> :
              <p></p>}
          </Flex>


        </CardHeader>




      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Quiz löschen
            </AlertDialogHeader>

            <AlertDialogBody>
              Bist du dir sicher?<br /> Das Quiz wird unwiderruflich gelöscht.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Abbrechen
              </Button>
              <Button leftIcon={deleteIsLoading ? <Spinner size={"xs"}/> :<DeleteIcon/>} colorScheme='red' onClick={handleDelete} ml={3}>
                Löschen
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Box>
  )
}

export default QuizCard