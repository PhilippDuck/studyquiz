import React, { useEffect } from "react";
import { useState } from "react";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import QuestionCard from "../components/QuestionCard";
import { useRealm } from "../provider/RealmProvider";
import { useNavigate } from "react-router-dom";
import { MdOutlineSave } from "react-icons/md";
import {
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Button,
  Flex,
  Spacer,
  Center,
  Text,
  VStack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  ButtonGroup,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import AddQuestionDrawer from "../components/AddQuestionDrawer";


function Create() {
  const app = useRealm();
  const navigate = useNavigate();

  let json = "";

  const [newQuiz, setNewQuiz] = useState({
    title: "",
    owner: app.currentUser.id,
    creationDate: "",
    questions: [],
  });

  const toast = useToast();
  const importModalDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let newQuestion = {
    question: "",
    answers: ["", "", "", ""],
    rightAnswer: 0,
    hint: "",
  };
  const sampleQuestion = [
    {
      question: "Was steht für 'CPU'?",
      answers: [
        "Central Print Unit",
        "Computer Protocol Utility",
        "Central Processing Unit",
        "Computer Peripheral Utility",
      ],
      rightAnswer: 2,
      hint: "Die CPU führt Prozesse aus.",
    },
  ];

  const [questions, setQuestions] = useState([]);
  const [isSaveing, setIsSaving] = useState(false);

  async function createNewQuiz() {
    setIsSaving(true);
    try {
      const newValue = { ...newQuiz, creationDate: Date.now(), questions: questions };
      // Check if new Quiz is valid
      if (newValue.title != "" && newValue.questions.length > 0) {
        const result = await app.currentUser.functions.createQuiz(
          JSON.stringify(newValue)
        );
        toast({
          title: "Quiz erfolgreich erstellt.",
          status: "success",
          duration: 2000,
          isClosable: true,
        }); 
        setNewQuiz(newValue); // Zustand hier aktualisieren
         
        navigate("/games");
      } else {
        toast({
          title: "Quiz unvollständig!",
          description: "Titel und Fragen dürfen nicht leer sein.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsSaving(false);
  }
  

  function addNewQuestion(question) {
    setQuestions([...questions, question]);
    console.log(questions);
  }

  function importJSONQuestions(json) {
    console.log(json);
    importModalDisclosure.onClose();
    try {
      const newQuestions = JSON.parse(json);
      setQuestions([...questions, ...newQuestions]);
      toast({
        title: "Fragen erfolgreich importiert",

        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Fehler beim importieren",

        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Flex>
        <Heading>Spiel erstellen</Heading>
        <Spacer></Spacer>
        <Center>
          <Button
            leftIcon={
              isSaveing ? (
                <Spinner size={"xs"} />
              ) : (
                <MdOutlineSave size={"20px"} />
              )
            }
            onClick={createNewQuiz}
            colorScheme={"teal"}
            size={"sm"}
          >
            Speichern
          </Button>
        </Center>
      </Flex>
      <Box h="30px" />
      <Center w="100%">
        <FormControl isRequired>
          <FormLabel>Titel:</FormLabel>
          <Input
            onChange={(e) => {
              setNewQuiz({ ...newQuiz, title: e.target.value });
            }}
            type="text"
          />
        </FormControl>
      </Center>
      <Box h="20px"></Box>
      <Flex>
        <Heading size="lg">Fragen</Heading>

        <Spacer></Spacer>
        <Center>
          <ButtonGroup size="sm" isAttached>
            <Button
              leftIcon={<DownloadIcon />}
              variant={"outline"}
              onClick={importModalDisclosure.onOpen}
            >
              import
            </Button>
            <Button leftIcon={<AddIcon />} onClick={onOpen}>
              Hinzufügen
            </Button>
          </ButtonGroup>
        </Center>
      </Flex>
      <Box h="5px"></Box>
      <Flex>
        <Spacer></Spacer>
        <Text color="gray" fontSize={"sm"}>
          {"Anzahl: " + questions.length + ""}
        </Text>
      </Flex>

      <Box h="20px"></Box>
      <VStack spacing="10px">
        {questions.map((q, i) => {
          return <QuestionCard key={i} question={q} />;
        })}
      </VStack>
      <p>{newQuestion.answers}</p>
      <Box h="10px"></Box>

      <AddQuestionDrawer
        addNewQuestion={addNewQuestion}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
      />

      <Modal
        isCentered
        isOpen={importModalDisclosure.isOpen}
        onClose={importModalDisclosure.onClose}
      >
        <ModalOverlay />
        <ModalContent maxW="xl">
          <ModalHeader>Fragen als JSON Text importieren</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(input) => {
                json = input.target.value;
              }}
              h="400px"
              placeholder={JSON.stringify(sampleQuestion, null, 2)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<DownloadIcon />}
              colorScheme="teal"
              mr={3}
              onClick={() => importJSONQuestions(json)}
            >
              importieren
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Create;
