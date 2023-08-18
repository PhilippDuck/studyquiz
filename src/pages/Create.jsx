import React from "react";
import { useState } from "react";
import { QuestionIcon, AddIcon, DownloadIcon } from "@chakra-ui/icons";
import QuestionCard from "../components/QuestionCard";
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
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  Flex,
  Spacer,
  Select,
  Center,
  Text,
  VStack,
  HStack,
  Icon,
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
  useToast,
 
} from "@chakra-ui/react";

function Create() {
  let json = ""

  const toast = useToast()
  const importModalDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  let newQuestion = {
    question: "",
    answers: ["", "", "", ""],
    rightAnswer: 0,
    hint: ""
  };
  const sampleQuestion = 
    [{
      question: "Was steht für 'CPU'?",
      answers: [
        "Central Print Unit",
        "Computer Protocol Utility",
        "Central Processing Unit",
        "Computer Peripheral Utility"
      ],
      rightAnswer: 2,
      hint: "Die CPU führt Prozesse aus."
    }]
  
  const [questions, setQuestions] = useState([

  ]);

  function addNewQuestion(question) {
    onClose();
    setQuestions([...questions, question]);
  }
  function importJSONQuestions(json) {
    console.log(json);
    importModalDisclosure.onClose();
    try {
      const newQuestions = JSON.parse(json);
      setQuestions([...questions, ...newQuestions]);
      toast({
        title: 'Fragen erfolgreich importiert',
        
        status: "success",
        duration: 4000,
        isClosable: true,
      })
    } catch (error) {
      console.log(error);
      toast({
        title: 'Fehler beim importieren',
        
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
    
  }

  return (
    <>
      <Center w="100%">
        <FormControl isRequired>
          <FormLabel>Titel:</FormLabel>
          <Input type="text" />
        </FormControl>
      </Center>
      <Box h="20px"></Box>
      <Flex>
        <Heading size="lg">Fragen</Heading>
  
        
        <Spacer></Spacer>
        <Center>
        <ButtonGroup size="sm" isAttached >
        <Button  leftIcon={<DownloadIcon />} variant={"outline"} onClick={importModalDisclosure.onOpen}>
          import
        </Button>
        <Button  leftIcon={<AddIcon />} onClick={onOpen}>
          Hinzufügen

        </Button>
        </ButtonGroup>
        </Center>
      </Flex>
      <Box h="5px"></Box>
      <Flex><Spacer></Spacer><Text color="gray" fontSize={"sm"}>{"Anzahl: " + questions.length + ""}</Text></Flex>
      

      <Box h="20px"></Box>
      <VStack spacing="10px">
        {
          questions.map((q, i) => {
            return <QuestionCard key={i} question={q} />
          })
        }
      </VStack>
      <p>{newQuestion.answers}</p>
      <Box h="10px"></Box>
      <Drawer colorScheme={"red"} size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Frage hinzufügen</DrawerHeader>

          <DrawerBody>
            <VStack>
              <Box h="20px"></Box>
              <FormControl isRequired>
                <FormLabel>Fragentitel:</FormLabel>
                <Input onChange={(e) => { newQuestion.question = e.target.value }} placeholder="Frage ..." />
              </FormControl>
              <Box h="20px"></Box>
              <FormControl isRequired>
                <FormLabel>Antwortmöglichkeiten:</FormLabel>
                <Input onChange={(e) => { newQuestion.answers[0] = e.target.value }} placeholder="1. Antwort ..." />
              </FormControl>
              <FormControl isRequired>
                <Input onChange={(e) => { newQuestion.answers[1] = e.target.value }} placeholder="2. Antwort ..." />
              </FormControl>
              <FormControl isRequired>
                <Input onChange={(e) => { newQuestion.answers[2] = e.target.value }} placeholder="3. Antwort ..." />
              </FormControl>
              <FormControl isRequired>
                <Input onChange={(e) => { newQuestion.answers[3] = e.target.value }} placeholder="4. Antwort ..." />
              </FormControl>
              <Box h="20px"></Box>
              <FormControl isRequired>
                <FormLabel>Korrekte Antwort:</FormLabel>
                <Select onChange={(e) => { newQuestion.rightAnswer = e.target.value }} placeholder="Richtige Antwort">
                  <option value={0}>Antwort 1</option>
                  <option value={1}>Antwort 2</option>
                  <option value={2}>Antwort 3</option>
                  <option value={3}>Antwort 4</option>
                </Select>
              </FormControl>
              <Box h="20px"></Box>
              <FormControl>
                <FormLabel>Hinweis:</FormLabel>
                <Input onChange={(e) => { newQuestion.hint = e.target.value }} placeholder="Hinweis ..." />
              </FormControl>
            </VStack>

          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Abbrechen
            </Button>
            <Button onClick={() => { addNewQuestion(newQuestion) }} colorScheme="blue">Hinzufügen</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Modal isCentered isOpen={importModalDisclosure.isOpen} onClose={importModalDisclosure.onClose}>
        <ModalOverlay />
        <ModalContent maxW="xl"  >
          <ModalHeader>Fragen als JSON Text importieren</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Textarea onChange={(input) => {json = input.target.value}} h="400px" placeholder={"Beispiel: \n" +JSON.stringify(sampleQuestion, null, 2)} />
     
          </ModalBody>
          <ModalFooter>
          <Button leftIcon={<DownloadIcon/>} colorScheme='blue' mr={3} onClick={()=>importJSONQuestions(json)}>
              importieren
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Create;
