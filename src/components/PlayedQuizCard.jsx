import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Text,
  CardHeader,
  Avatar,
  Flex,
  Box,
  Center,
  Tooltip,
} from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";
import unixToReadableDate from "../helperFunctions/unixTimeToReadable";

function PlayedQuizCard(props) {
  const [owner, setOwner] = useState("");
  const app = useRealm();



  useEffect(() => {
    async function getNicknameById() {
      if (app.currentUser) {
        const result = await app.currentUser.functions.getNicknameById({
          id: props.playedQuiz.playerId,
        }); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
        //console.log('Ergebnis der Funktion:', result);
        return result;
      } else {
        console.log("errr");
      }
    }
    getNicknameById().then((e) => {
      setOwner(e);
    });
  }, []);

  return (
    <Card variant={"outline"} w={"100%"}>
      <CardHeader>
        <Flex gap={"20px"}>
          <Center>
            <Tooltip label={owner}>
              <Avatar name={owner} />
            </Tooltip>
          </Center>
          <Box>
            <Text fontSize={"xs"}>
              {unixToReadableDate(props.playedQuiz.endTime).formattedDate} {unixToReadableDate(props.playedQuiz.endTime).formattedTime} Uhr{" "}
            </Text>
            {props.withQuizName ? (
              <Text fontSize={"xs"}>
                <b>{owner}</b>
                {" hat das Quiz "} <b>{props.playedQuiz.quizTitle}</b>{" "}
                {" gespielt und dabei"} {props.playedQuiz.points}{" "}
                {props.playedQuiz.points === 1 || props.playedQuiz.points === -1
                  ? "Punkt"
                  : "Punkte"}{" "}
                in {props.playedQuiz.playedTime} Sekunden erreicht.
              </Text>
            ) : (
              <>
                <b>
                  <Text>{owner}</Text>
                </b>
                <Text fontSize={"xs"}>
                  {props.playedQuiz.points}{" "}
                  {props.playedQuiz.points === 1 ||
                  props.playedQuiz.points === -1
                    ? "Punkt"
                    : "Punkte"}{" "}
                  in {props.playedQuiz.playedTime} Sekunden erreicht.
                </Text>
              </>
            )}
          </Box>
        </Flex>
      </CardHeader>
    </Card>
  );
}

export default PlayedQuizCard;
