import React, { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, Link } from "react-router-dom";
import {
  Heading,
  useColorMode,
  Button,
  ButtonGroup,
  Center,
  Square,
  Circle,
  Flex,
  Spacer,
  IconButton,
  Container,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useMediaQuery,
  Box
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  MoonIcon,
  SunIcon
} from "@chakra-ui/icons";
import { App, Credentials } from "realm-web";
import { useRealm } from "./provider/RealmProvider";




function Root() {
  const app = useRealm();
  useEffect(() => {
    const callRealmFunction = async () => {
      // Anonym anmelden
      const credentials = Credentials.anonymous();
      if (app.currentUser) {
        console.log(" bereits eingeloggt. " + app.currentUser.id)
      } else {
        try {
          const user = await app.logIn(credentials);
          console.log('Erfolgreich anonym angemeldet als', user.id);

          // Serverfunktion aufrufen

        } catch (err) {
          console.error('Fehler:', err.message);
        }
      }
    };
    callRealmFunction();
  }, []);



  const { colorMode, toggleColorMode } = useColorMode();
  const [isNotSmallerScreen, isLargerScreen] = useMediaQuery([
    "(min-width: 600px)",
    "(min-width: 900px)"
  ]);


  return (
    <>
      <Box shadow="xs" w="100%" h="80px" p={4}>
        <Flex h="100%">
          <Center>
            <Box w="100px">
              <Menu>
                {isLargerScreen || isNotSmallerScreen ?
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Menü
                  </MenuButton> : <MenuButton as={Button} >
                    <ChevronDownIcon />
                  </MenuButton>}

                <MenuList>
                  <Link to={`play/`}><MenuItem>Spielen</MenuItem></Link>
                  <Link to={`quizList/`}><MenuItem>Quiz Liste</MenuItem></Link>
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

      <Container maxW={"2xl"}>
        <Box h="20px"></Box>
        <Outlet />
      </Container>

    </>
  )
}

export default Root