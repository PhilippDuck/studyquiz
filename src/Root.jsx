import React from 'react'
import { useState } from "react";
import { Heading } from "@chakra-ui/react";
import { useColorMode, Button, ButtonGroup } from "@chakra-ui/react";
import { Stack, HStack, VStack } from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon,
  QuestionIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { Center, Square, Circle } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { questions } from "./assets/questions";

import Question from "./components/Question";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";


function Root() {

    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();
    const [quizIsDone, setQuizIsDone] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const numberOfQuestions = questions.length;
    const [mistakeCounter, setMistakeCounter] = useState(0);
  
    function checkAnswer(answer) {
      //console.log(answer);
      if (answer === questions[currentQuestion].rightAnswer) {
        toast({
          title: "Richtig!",
          status: "success",
          duration: 700,
        });
        if (currentQuestion === numberOfQuestions - 1) {
          setQuizIsDone(true);
        }
        setCurrentQuestion(currentQuestion + 1);
      } else {
        toast({
          title: "Falsch!",
          status: "error",
          duration: 700,
        });
        setMistakeCounter(mistakeCounter + 1);
      }
    }
  
    function repeatQuiz() {
      setCurrentQuestion(0);
      setQuizIsDone(false);
      setMistakeCounter(0);
    }
  return (
    <>
      <Box shadow="xs" w="100%" h="80px" p={4}>
        <Flex h="100%">
          <Center>
            <Box w="100px">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Menü
                </MenuButton>
                <MenuList>
                <Link to={`play/`}><MenuItem>Spielen</MenuItem></Link>
                  <MenuItem>Ranglisten</MenuItem>
                  <MenuItem>Historie</MenuItem>
                  <Link to={`create/`}><MenuItem>Erstellen</MenuItem></Link>
                  <MenuItem>Info</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Center>
          <Center flex={1}>
          <Link to={`/`}><Heading>StudyQuiz</Heading></Link>
          </Center>
          <Flex w="100px">
            <Spacer />
            <IconButton
              onClick={toggleColorMode}
              aria-label="Darkmode umschalten"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
          </Flex>
        </Flex>
      </Box>

      <Container>
      <Box h="20px"></Box>
      <Outlet />
      </Container>
      
    </>
  )
}

export default Root