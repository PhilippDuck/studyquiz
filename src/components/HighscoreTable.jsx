import React from "react";
import unixToReadableDate from "../helperFunctions/unixTimeToReadable";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
  Center,
  Avatar,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRealm } from "../provider/RealmProvider";
import DateAndTime from "./DateAndTime";

function HighscoreTable(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [highscores, setHighscores] = useState([]);
  const app = useRealm();

  useEffect(() => {
    getHighscoreByQuizId(props.quizId);
  }, [props.quizId]);

  useEffect(() => {
    getHighscoreByQuizId(props.quizId);
  }, []);

  async function getHighscoreByQuizId(quizId) {
    setIsLoading(true);
    //console.log(quizId)
    const result = await app.currentUser.functions.getHighscoreByQuizId(
      quizId.toString(),
      10
    );
    //console.log(result);
    setHighscores(result);

    setIsLoading(false);
    return result;
  }

  return (
    <>
      <TableContainer w={"100%"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Spieler</Th>
              <Th>Zeitpunkt</Th>
              <Th isNumeric>Punkte</Th>
              <Th isNumeric>Zeit</Th>
            </Tr>
          </Thead>

          <Tbody>
            {highscores.map((highscore) => {
              return (
                <Tr
                  fontWeight={
                    highscore.playerId === app.currentUser.id ? "bold" : ""
                  }
                  key={highscore._id.toString()}
                >
                  <Td>
                    <Flex gap={2}>
                      <Avatar size={"sm"} name={highscore.nickname} />
                      <Center>{highscore.nickname}</Center>
                    </Flex>
                  </Td>
                  <Td fontSize={"sm"}>
                    <DateAndTime timestamp={highscore.endTime} />
                  </Td>
                  <Td isNumeric>{highscore.points}</Td>
                  <Td isNumeric>{highscore.playedTime} s</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoading ? (
        <Center mt={4}>
          <Spinner size={"xl"} />
        </Center>
      ) : (
        ""
      )}
    </>
  );
}

export default HighscoreTable;
