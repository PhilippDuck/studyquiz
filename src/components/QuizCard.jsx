import React from 'react'
import { Card, Heading, CardHeader, CardBody, CardFooter, Button,  VStack, Spacer, Text, Box  } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function QuizCard(props) {
  return (
    <Box w="100%">
    <Link w="100%" to={"/play"} state={{questions: props.quiz.questions}} >
    <Card variant={"outline"} _hover={{ border: "1px", cursor: "pointer" }} size="sm" w="100%" direction={{ base: 'column', sm: 'row' }}>
      <VStack align={"start"}>
        <CardHeader>
        <Heading size="sm">{props.quiz.title}</Heading>
        <Text fontSize={"sm"}>{props.quiz.questions.length + " Fragen"}</Text>
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