import React from "react";
import { useRealm } from "../provider/RealmProvider";
import { useEffect, useState } from "react";
import {
  Heading,
  Spinner,
  VStack,
  Box,
  Center,
  Button,
  Flex,
  Spacer,
  useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import QuizCard from "../components/QuizCard";
import { Link, useLocation } from "react-router-dom";

function Quizzes(props) {
  const app = useRealm();
  const toast = useToast();
  const [quizzes, setQuizzes] = useState();
  

  useEffect(() => {
    async function getQuizzes() {
      if (app.currentUser) {
        const result = await app.currentUser.functions.getQuizzes(); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
        //console.log('Ergebnis der Funktion:', result);
        setQuizzes(result);
      } else {
        console.log("nicht eingeloggt");
      }
    }
    getQuizzes();
  }, []);

  async function deleteQuiz(quizId) {
    try {
      const result = await app.currentUser.functions.deleteQuizByOwnerId(
        quizId.toString(),
        app.currentUser.id.toString()
      );
      console.log(result);
      
        const updatedQuizzes = quizzes.filter(quiz => quiz._id !== quizId);
        setQuizzes(updatedQuizzes);
        toast({
          title: "Quiz wurde erfolgreich entfernt.",
          status: "success",
          duration: 3000,
          isClosable: true,
        }); 
        
      
    } catch (error) {
      toast({
        title: "Fehler beim löschen",
        status: "error",
        duration: 3000,
        isClosable: true,
      }); 
      console.log(error);
    }
  }

  return (
    <>
      <Flex>
        <Heading>Spielen</Heading>
        <Spacer></Spacer>
        <Center>
          <Link to={"/create"}>
            <Button leftIcon={<AddIcon />} colorScheme={"primary"} size={"sm"}>
              Erstellen
            </Button>
          </Link>
        </Center>
      </Flex>

      <Box h="30px"></Box>
      <VStack align={"start"}>
        {quizzes ? (
          quizzes.map((q) => {
            return <QuizCard deleteQuiz={deleteQuiz} key={q._id} quiz={q} />;
          })
        ) : (
          <Box w="100%" h="100px">
            <Center>
              <Spinner size="xl" />
            </Center>
          </Box>
        )}
      </VStack>
    </>
  );
}

export default Quizzes;
