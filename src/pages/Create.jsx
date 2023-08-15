import React from "react";
import { useState } from "react";
import { QuestionIcon, AddIcon } from "@chakra-ui/icons";
import QuestionCard from "../components/QuestionCard";
import {
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
} from "@chakra-ui/react";

function Create() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [questions, setQuestions] = useState([
    {
      question: "Was steht für 'CPU'?",
      answers: [
        "Central Print Unit",
        "Computer Protocol Utility",
        "Central Processing Unit",
        "Computer Peripheral Utility"
      ],
      rightAnswer: 2,
      hint: "Die CPU führt Prozesse aus."
    }
  ]);

  return (
    <>
      <Center w="100%">
        <FormControl>
          <FormLabel>Titel:</FormLabel>
          <Input type="text" />
        </FormControl>
      </Center>
      <Box h="20px"></Box>
      <Flex>
        <Heading size="lg">Fragen</Heading>
        <Spacer></Spacer>
        <Button size="sm" leftIcon={<AddIcon />} onClick={onOpen}>
          Hinzufügen
        </Button>
      </Flex>

      <Box h="20px"></Box>
      <QuestionCard />
      <Box h="10px"></Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Frage hinzufügen</DrawerHeader>

          <DrawerBody>
            <VStack spacing="10px">
              <Input placeholder="Frage ..." />
              <Box h="10px"></Box>
              <Input placeholder="1. Antwort ..." />
              <Input placeholder="2. Antwort ..." />
              <Input placeholder="3. Antwort ..." />
              <Input placeholder="4. Antwort ..." />
              <Box h="10px"></Box>
              <Select placeholder="Richtige Antwort">
                <option value="1">Antwort 1</option>
                <option value="2">Antwort 2</option>
                <option value="3">Antwort 3</option>
                <option value="4">Antwort 4</option>
              </Select>
              <Box h="10px"></Box>
              <Input placeholder="Hinweis ..." />
              
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Abbrechen
            </Button>
            <Button colorScheme="blue">Hinzufügen</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Create;
