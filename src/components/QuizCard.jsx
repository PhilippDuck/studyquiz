import React from 'react'
import { Card, Heading, CardHeader, CardBody, CardFooter, Button,  VStack, Spacer, Text  } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function QuizCard(props) {
  return (
    <Card size="sm" w="100%" direction={{ base: 'column', sm: 'row' }}>
      <VStack align={"start"}>
        <CardHeader>
        <Heading size="sm">{props.quiz.title}</Heading>
        <Text fontSize={"sm"}>{props.quiz.questions.length + " Fragen"}</Text>
        </CardHeader>
       
        </VStack>
        <Spacer />
        <CardFooter>
        <Link to={"/play"} state={{questions: props.quiz.questions}} ><Button variant='solid' >
        spielen
      </Button></Link>
      
    </CardFooter>
    </Card>
  )
}

export default QuizCard