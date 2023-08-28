import React from 'react'
import {Flex, Box, Card, Heading, Center} from "@chakra-ui/react";
import Quizzes from './Quizzes';

function Home() {
  return (


    <Center maxW={"100%"}>
    <Flex w={"6xl"}  flexWrap="wrap">
    <Card variant={"outline"} m={2} width={{ base: '100%', lg:'calc(50% - 16px)' }} p={4}>
      <Quizzes/>
    </Card>
    <Card variant={"outline"} m={2} width={{ base: '100%', lg: 'calc(50% - 16px)'}} p={4}>
      <Heading>Coming soon...</Heading>
    </Card>
  </Flex>
  </Center>


  )
}

export default Home