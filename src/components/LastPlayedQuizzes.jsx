import React from 'react'
import { useEffect, useState } from 'react';
import { useRealm } from "../provider/RealmProvider";
import { VStack, Heading, Box } from '@chakra-ui/react';
import PlayedQuizCard from './playedQuizCard';

function LastPlayedQuizzes() {

    const app = useRealm();
    const [lastPlayedQuizzes, setLastPlayedQuizzes] = useState([]);

    useEffect(()=> {
        getLastPlayedQuizzes(5);
    }, []);

    async function getLastPlayedQuizzes(numberOfQuizzes) {

        const result = await app.currentUser.functions.getLastPlayedQuizzes(numberOfQuizzes);
        setLastPlayedQuizzes(result);
        console.log(result);
        return result;

      }

  return (
    <>
    <Heading size={"lg"}>Letzte Spiele</Heading>
    <Box h="30px"></Box>
        <VStack>
                      {lastPlayedQuizzes.map((playedQuiz) => {
                        return (
                          <PlayedQuizCard
                            key={playedQuiz._id}
                            playedQuiz={playedQuiz}
                            withQuizName={true}
                          />
                        );
                      })}

                    </VStack> 
    </>
  )
}

export default LastPlayedQuizzes