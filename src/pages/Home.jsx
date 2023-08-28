import React from 'react'
import {Flex, Box, Card, Heading, Center} from "@chakra-ui/react";
import Quizzes from './Quizzes';
import LastPlayedQuizzes from '../components/LastPlayedQuizzes';

function Home() {
  return (


    <Center maxW={"100%"}>
    <Flex w={"6xl"}  flexWrap="wrap" alignItems="flex-start">
    <Card variant={"outline"} m={3} width={{ base: '100%', lg:'calc(60% - 25px)' }} p={4}>
      <Quizzes/>
    </Card>
    <Card variant={"outline"} m={3} width={{ base: '100%', lg: 'calc(40% - 25px)'}} p={4}>

    <LastPlayedQuizzes/>
    </Card>
  </Flex>
  </Center>


  )
}

export default Home