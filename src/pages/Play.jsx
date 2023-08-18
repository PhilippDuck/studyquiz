import React from "react";

import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useColorMode, Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import {
  RepeatIcon,
} from "@chakra-ui/icons";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { questions } from "../assets/questions";
import Question from "../components/Question";
import { Box } from "@chakra-ui/react";

function Play() {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const [quizIsDone, setQuizIsDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const numberOfQuestions = questions.length;
  const [mistakeCounter, setMistakeCounter] = useState(0);

  function checkAnswer(answer) {
    //console.log(answer);
    if (answer === questions[currentQuestion].rightAnswer) {
      toast({
        title: "Richtig!",
        status: "success",
        duration: 700,
      });
      if (currentQuestion === numberOfQuestions - 1) {
        setQuizIsDone(true);
      }
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast({
        title: "Falsch!",
        status: "error",
        duration: 700,
      });
      setMistakeCounter(mistakeCounter + 1);
    }
  }

  function repeatQuiz() {
    setCurrentQuestion(0);
    setQuizIsDone(false);
    setMistakeCounter(0);
  }
  return (
    <>
      
      <Center>
        <Text>{currentQuestion + " / " + numberOfQuestions}</Text>
      </Center>
      <Box h="5px"></Box>

      <Progress
        size="sm"
        colorScheme="green"
        value={(currentQuestion * 100) / numberOfQuestions}
      />

      <Box h="40px"></Box>
      {quizIsDone ? (
        <Center>
          <VStack spacing={10}>
            <Heading>Quiz beendet!</Heading>
            <Text>Du hast {mistakeCounter} Fehler gemacht.</Text>
            <Button
              leftIcon={<RepeatIcon />}
              colorScheme="blue"
              onClick={repeatQuiz}
            >
              wiederholen
            </Button>
          </VStack>
        </Center>
      ) : (
        <Question
          checkAnswer={checkAnswer}
          questions={questions}
          currentQuestion={currentQuestion}
        />
      )}
    </>
  );
}

export default Play;