import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useColorMode, Button, ButtonGroup } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  QuestionIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import shuffleArray from "../helperFunctions/shuffleArray";

function Question(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [shuffledArray, setShuffledArray] = useState([]);
  const [elementToFind, setElementToFind] = useState("");
  const [newPosition, setNewPosition] = useState(-1);

  useEffect(() => {


    const originalArray = [...props.questions[props.currentQuestion].answers];
    const positionOfElementToFind = props.questions[props.currentQuestion]
      .rightAnswer;

    // Finde das Element an der gegebenen Position im ursprünglichen Array
    const elementToFind = originalArray[positionOfElementToFind];

    // Erstelle eine Kopie des Arrays und shuffele es
    let shuffledArray = [...originalArray];
    shuffledArray = shuffleArray(shuffledArray);

    // Finde die neue Position des gesuchten Elements im geschüttelten Array
    const newPosition = shuffledArray.indexOf(elementToFind);

    setShuffledArray(shuffledArray);
    setElementToFind(elementToFind);
    setNewPosition(newPosition);
  }, [props.currentQuestion]);

  return (
    <VStack spacing="40px">
      <Flex w="full">
        <Box flex={1}>
          <Center minH="150px">
            <Text fontSize="2xl">
              {props.questions[props.currentQuestion].question}
            </Text>
          </Center>
        </Box>

        <Tooltip label="Erhalte einen Hinweis">
          <IconButton
            onClick={onOpen}
            isRound="true"
            aria-label="Search database"
            icon={<QuestionIcon />}
          />
        </Tooltip>
      </Flex>

      <SimpleGrid columns={2} spacing={5} w="100%">
        {shuffledArray.map((e, i) => {
          return (
            <Button
              minH="100px"
              w="full"
              whiteSpace={"normal"}
              onClick={() => props.checkAnswer(e)}
              key={i}
            >
              {e}
            </Button>
          );
        })}
      </SimpleGrid>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="300px">
          <ModalHeader>Hinweis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {props.questions[props.currentQuestion].hint}
            <Box h="10px"></Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default Question;
