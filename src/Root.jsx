import React, { useState, useEffect, createContext, useContext } from "react";
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
  Box,
  Spinner,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {HiChartBar} from "react-icons/hi2";
import { LuGamepad2, LuUser } from "react-icons/lu";
import {  Credentials } from "realm-web";
import { useRealm } from "./provider/RealmProvider";

function Root() {
  const app = useRealm();

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const callRealmFunction = async () => {
      // Anonym anmelden
      const credentials = Credentials.anonymous();
      if (app.currentUser) {
        try {
          await app.currentUser.refreshAccessToken();
          console.log(" bereits eingeloggt. " + app.currentUser.id);
          setIsLogged(true);
        } catch (error) {
          console.log("Fehler beim refresh: " + error);
          localStorage.clear();
          callRealmFunction();
        }
      } else {
        try {
          const user = await app.logIn(credentials);
          console.log("Erfolgreich anonym angemeldet als", user.id);
          setIsLogged(true);
          // Serverfunktion aufrufen
        } catch (err) {
          console.error("Fehler:", err.message);
        }
      }
    };
    callRealmFunction();
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();
  const [isNotSmallerScreen, isLargerScreen] = useMediaQuery([
    "(min-width: 600px)",
    "(min-width: 900px)",
  ]);

  return (
    <>
      <Box shadow="xs" w="100%" h="80px" p={4}>
        <Flex h="100%">
          <Center>
            <Box w="100px">
              <Menu>
                {isLargerScreen || isNotSmallerScreen ? (
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Menü
                  </MenuButton>
                ) : (
                  <MenuButton as={Button}>
                    <ChevronDownIcon />
                  </MenuButton>
                )}

                <MenuList>
                  <Link to={`games/`}>
                    <MenuItem>
                      <HStack>
                        <LuGamepad2 />
                        <Text>Spielen</Text>
                      </HStack>
                    </MenuItem>
                  </Link>

                  <Link to={`highscores/`}>
                    <MenuItem>
                      <HStack>
                        <HiChartBar />
                        <Text>Bestenlisten</Text>
                      </HStack>
                    </MenuItem>
                  </Link>

                  <Link to={`profile/`}>
                  <MenuItem>
                    <HStack>
                      <LuUser />
                      <Text>Profil</Text>
                    </HStack>
                    </MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Box>
          </Center>
          <Center flex={1}>
            <Link to={`/`}>
              <Heading>StudyQuiz</Heading>
            </Link>
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

      <Box>
        <Box h="20px"></Box>
        {isLogged ? (
          <Outlet />
        ) : (
          <Center w={"100%"} h="300px">
            <Spinner size="xl" />
          </Center>
        )}
      </Box>
    </>
  );
}

export default Root;
