import React from "react";
import { useEffect, useState } from "react";
import { useRealm } from "../provider/RealmProvider";
import { VStack, Heading, Box, Spinner, Center } from "@chakra-ui/react";
import PlayedQuizCard from "./playedQuizCard";

function LastPlayedQuizzes() {
  const app = useRealm();
  const [lastPlayedQuizzes, setLastPlayedQuizzes] = useState([]);
  const [isLoadingLastPlayedQuizzes, setIsLoadingLastPlayedQuizzes] = useState(true);

  useEffect(() => {
    setIsLoadingLastPlayedQuizzes(true);
    getLastPlayedQuizzes(5);
    setIsLoadingLastPlayedQuizzes(false);
  }, []);

  async function getLastPlayedQuizzes(numberOfQuizzes) {
    const result = await app.currentUser.functions.getLastPlayedQuizzes(
      numberOfQuizzes
    );
    setLastPlayedQuizzes(result);
    console.log(result);
    return result;
  }

  return (
    <>
      <Heading size={"lg"}>Letzte Spiele</Heading>
      <Box h="30px"></Box>
      
      {isLoadingLastPlayedQuizzes ? <Center><Spinner size={"xl"}/></Center> : <VStack>
        {lastPlayedQuizzes.map((playedQuiz) => {
          return (
            <PlayedQuizCard
              key={playedQuiz._id}
              playedQuiz={playedQuiz}
              withQuizName={true}
            />
          );
        })}
      </VStack>}
      
    </>
  );
}

export default LastPlayedQuizzes;
