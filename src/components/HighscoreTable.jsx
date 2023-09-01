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
 
  
  const app = useRealm();


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
            {props.highscores.map((highscore) => {
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
      {props.isLoading ? (
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
