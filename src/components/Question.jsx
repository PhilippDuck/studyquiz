import React from "react";
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

function Question(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        {props.questions[props.currentQuestion].answers.map((e, i) => {
          return (
            <Button
              minH="100px"
              w="full"
              whiteSpace={"normal"}
              onClick={() => props.checkAnswer(i)}
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
