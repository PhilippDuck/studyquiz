import React from 'react'
import { Card,IconButton,ButtonGroup, Flex,HStack, Heading, CardHeader, CardBody, CardFooter, Button,  VStack, Spacer, Text, Box  } from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useRealm } from "../provider/RealmProvider";
import { useEffect, useState } from 'react';
import {DeleteIcon} from "@chakra-ui/icons";

function QuizCard(props) {
  

  const app = useRealm();
  const [owner, setOwner] = useState("");

   useEffect(() => {
    async function getNicknameById() {
      if (app.currentUser) {
        const result = await app.currentUser.functions.getNicknameById({id: props.quiz.owner}); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
        //console.log('Ergebnis der Funktion:', result);
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

    <Card variant={"outline"} _hover={{ border: "1px", cursor: "pointer" }} size="sm" w="100%" direction={{ base: 'column', sm: 'row' }}>
    <CardHeader w="100%">
      <Flex >
        <Box flex="1">
      <Link to={"/play"} state={{questions: props.quiz.questions}} >
      
      <VStack spacing={"2px"} align={"start"} minW="100%">
        
        <Heading size="sm">{props.quiz.title}</Heading>
        <Text fontSize={"sm"}>{props.quiz.questions.length + (props.quiz.questions.length === 1 ? " Frage" : " Fragen")}</Text>
        <Text color="gray" fontSize={"xs"}>{`Ersteller: ${owner}`}</Text>
        
        
        </VStack>
        
  
        </Link>
        </Box>
        {props.quiz.owner === app.currentUser.id ? 
        <IconButton size={"xs"} onClick={()=> {props.deleteQuiz(props.quiz._id)}} icon={<DeleteIcon/>}/> :
        <p></p>}
        </Flex>
       
        
        </CardHeader>
        
        
        
       
    </Card>

    </Box>
  )
}

export default QuizCard