import React from 'react'
import { Card, Heading, CardHeader, CardBody, CardFooter, Button,  VStack, Spacer, Text, Box  } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useRealm } from "../provider/RealmProvider";
import { useEffect, useState } from 'react';

function QuizCard(props) {

  const app = useRealm();
  const [owner, setOwner] = useState("");

   useEffect(() => {
    async function getNicknameById() {
      if (app.currentUser) {
        const result = await app.currentUser.functions.getNicknameById({id: props.quiz.owner}); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
        console.log('Ergebnis der Funktion:', result);
        return result;
      } else {
        console.log("errr");
      }
      
    }
    getNicknameById().then(e => {
      setOwner(e);
    });
  }, []) 

  return (
    <Box w="100%">
    <Link w="100%" to={"/play"} state={{questions: props.quiz.questions}} >
    <Card variant={"outline"} _hover={{ border: "1px", cursor: "pointer" }} size="sm" w="100%" direction={{ base: 'column', sm: 'row' }}>
      <VStack align={"start"}>
        <CardHeader>
        <Heading size="sm">{props.quiz.title}</Heading>
        <Text fontSize={"sm"}>{props.quiz.questions.length + (props.quiz.questions.length === 1 ? " Frage" : " Fragen")}</Text>
        <Text color="gray" fontSize={"xs"}>{`Ersteller: ${owner}`}</Text>
        </CardHeader>
       
        </VStack>
        <Spacer />
        <CardFooter>
        
      
    </CardFooter>
    </Card>
    </Link>
    </Box>
  )
}

export default QuizCard