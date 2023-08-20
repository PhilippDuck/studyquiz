import React from 'react'
import { useRealm } from "../provider/RealmProvider";
import { useEffect, useState } from 'react';
import { Heading, Spinner, VStack, Box, Center, Button, Flex, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import QuizCard from '../components/QuizCard';
import { Link } from "react-router-dom";


function Quizzes() {

  const app = useRealm();
  const [quizzes, setQuizzes] = useState();

  useEffect(() => {
    async function getQuizzes() {
      const result = await app.currentUser.functions.getQuizzes(); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
      console.log('Ergebnis der Funktion:', result);
      setQuizzes(result);
    }
    getQuizzes();
  }, [])


  return (
    <>
      <Flex>
        <Heading >Spielen</Heading>
        <Spacer></Spacer>
        <Center>
          <Link to={"/create"}>
            <Button leftIcon={<AddIcon />} colorScheme={"teal"} size={"sm"}>Erstellen</Button>
          </Link>
        </Center>

      </Flex>

      <Box h="30px"></Box>
      <VStack align={"start"}>
        {quizzes ? quizzes.map((q) => {
          return <QuizCard key={q._id} quiz={q} />
        }) : <Box w="100%" h="100px"><Center><Spinner size="xl" /></Center></Box>}
      </VStack>
    </>
  )
}

export default Quizzes