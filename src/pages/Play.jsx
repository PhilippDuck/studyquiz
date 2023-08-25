import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useColorMode, Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";
import { RepeatIcon } from "@chakra-ui/icons";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import Question from "../components/Question";
import { Box } from "@chakra-ui/react";
import shuffleArray from "../helperFunctions/shuffleArray";

function Play() {
  const [questions, setQuestions] = useState([]);

  //Hole Fragen und bringe sie in zufällige Reihenfolge
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(shuffleArray([...location.state.questions]));
      setGameData({...gameData, quizId: location.state.quizId});
    }
  }, [location.state]);

  const toast = useToast();
  const [quizIsDone, setQuizIsDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const numberOfQuestions = questions.length;
  const [mistakeCounter, setMistakeCounter] = useState(0);
  const [gameData, setGameData] = useState({
    quizId: "",
    playerId: "",
    startTime: 0,
    endTime: 0,
    mistakes: 0,
    usedHints: 0,
  });

  function checkAnswer(answer) {
    //console.log(answer);
    if (
      answer ===
      questions[currentQuestion].answers[questions[currentQuestion].rightAnswer]
    ) {
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
      setGameData({...gameData, mistakes: gameData.mistakes +1})
    }
  }

  function handleHintUsed() {
    setGameData({...gameData, usedHints: gameData.usedHints+1})
  }

  function repeatQuiz() {
    setCurrentQuestion(0);
    setQuizIsDone(false);
    setGameData({
      ...gameData, 
      mistakes: 0,
      usedHints: 0,

    })
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
            <Box><Text>Du hast {gameData.mistakes} Fehler gemacht</Text>
            <Text>und { gameData.usedHints} {gameData.usedHints === 1 ? "Hinweis": "Hinweise"} genutzt</Text></Box>
            
            <ButtonGroup>
              <Link to={"/games"}>
                <Button>Beenden</Button>
              </Link>

              <Button
                leftIcon={<RepeatIcon />}
                colorScheme="teal"
                onClick={repeatQuiz}
              >
                wiederholen
              </Button>
            </ButtonGroup>
          </VStack>
        </Center>
      ) : (
        questions.length > 0 && (
          <Question
            checkAnswer={checkAnswer}
            questions={questions}
            currentQuestion={currentQuestion}
            handleHintUsed={handleHintUsed}
          />
        )
      )}
    </>
  );
}

export default Play;
