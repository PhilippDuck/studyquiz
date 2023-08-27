import React, { useEffect, useState } from "react";
import {
  Heading,
  VStack,
  Center,
  Text,
  Progress,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useLocation} from "react-router-dom";
import Question from "../components/Question";
import shuffleArray from "../helperFunctions/shuffleArray";
import { useRealm } from "../provider/RealmProvider";
import PlayedQuizCard from "../components/playedQuizCard";
import ScoreCard from "../components/ScoreCard";

function Play() {
  const [questions, setQuestions] = useState([]);
  const app = useRealm();

  //Hole Fragen und bringe sie in zufällige Reihenfolge
  const location = useLocation();

  const toast = useToast();
  const [quizIsDone, setQuizIsDone] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const numberOfQuestions = questions.length;
  const [lastPlayedQuizzes, setLastPlayedQuizzes] = useState([]);

  const [gameData, setGameData] = useState({
    startTime: Date.now(),
    endTime: 0,
    playedTime: 0,
    mistakes: 0,
    usedHints: 0,
  });

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(shuffleArray([...location.state.questions]));
    }
  }, [location.state]);

  useEffect(() => {
    const newGamedata = {
      ...gameData,
      quizId: location.state.quizId,
      playerId: app.currentUser.id,
      endTime: Date.now(),
      playedTime: (Date.now() - gameData.startTime) / 1000,
      points: numberOfQuestions - gameData.mistakes - gameData.usedHints * 0.1,
    };
    if (quizIsDone) {
      addPlayedQuiz(newGamedata);
    }
    setGameData(newGamedata);
  }, [quizIsDone]);

  async function addPlayedQuiz(quizData) {
    const result = await app.currentUser.functions.addPlayedQuiz(
      JSON.stringify(quizData)
    );
    const lastQuizzesResult = await getLastFivePlayedQuizzesByQuizId(
      location.state.quizId
    );
    setLastPlayedQuizzes(lastQuizzesResult);
    console.log(lastQuizzesResult);
  }

  async function getLastFivePlayedQuizzesByQuizId(quizId) {
    const result =
      await app.currentUser.functions.getLastFivePlayedQuizzesByQuizId(quizId);

    console.log(quizId.toString());
    console.log(result);
    return result;
  }

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
      setGameData({ ...gameData, mistakes: gameData.mistakes + 1 });
    }
  }

  function handleHintUsed() {
    setGameData({ ...gameData, usedHints: gameData.usedHints + 1 });
  }

  function repeatQuiz() {
    setCurrentQuestion(0);
    setQuizIsDone(false);
    setGameData({
      ...gameData,
      mistakes: 0,
      usedHints: 0,
      startTime: Date.now(),
      endTime: 0,
      playedTime: 0,
      points: 0,
    });
  }
  return (
    <>
      <Center>
        <Text>{currentQuestion + " / " + numberOfQuestions}</Text>
      </Center>
      <Box h="5px"></Box>

      <Progress
        size="sm"
        colorScheme="primary"
        value={(currentQuestion * 100) / numberOfQuestions}
      />

      <Box h="40px"></Box>
      {quizIsDone ? (
        <Center>
          <VStack w="100%" spacing={10}>
            <ScoreCard
              numberOfQuestions={numberOfQuestions}
              gameData={gameData}
            />
            <Heading size={"lg"}>Letzte Spiele:</Heading>
            <Box w="100%" mb={"20px"}>
              <VStack>
                {lastPlayedQuizzes.map((playedQuiz) => {
                  return (
                    <PlayedQuizCard
                      key={playedQuiz._id}
                      playedQuiz={playedQuiz}
                    />
                  );
                })}
              </VStack>
            </Box>
          </VStack>
        </Center>
      ) : (
        questions.length > 0 && (
          <Question
            checkAnswer={checkAnswer}
            questions={questions}
            currentQuestion={currentQuestion}
            handleHintUsed={handleHintUsed}
            repeatQuiz={repeatQuiz}
          />
        )
      )}
    </>
  );
}

export default Play;
