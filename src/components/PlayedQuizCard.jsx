import React from "react";
import { useState, useEffect } from "react";
import {Card, Text, CardHeader, Avatar, Flex, Box, Center, Tooltip } from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";


function PlayedQuizCard(props) {
    const [owner, setOwner] = useState("");
    const app = useRealm();

    function unixToReadableDate(unixTimestamp) {
        // Erstellt ein neues Date-Objekt basierend auf dem Unix-Timestamp (multipliziert mit 1000, da JavaScript Millisekunden erwartet)
        const date = new Date(unixTimestamp);
      
        // Formatierung des Datums und der Uhrzeit
        const formattedDate = date.toLocaleDateString(); // z.B. "26.08.2023"
        const formattedTime = date.toLocaleTimeString(); // z.B. "12:34:56"
      
        return `${formattedDate} ${formattedTime}`;
      }
    

    useEffect(() => {
        async function getNicknameById() {
          if (app.currentUser) {
            const result = await app.currentUser.functions.getNicknameById({ id: props.playedQuiz.playerId }); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
            //console.log('Ergebnis der Funktion:', result);
            return result;
          } else {
            console.log("errr");
          }
    
        }
        getNicknameById().then(e => {
          setOwner(e);
        });
      }, [])

  return (
    <Card variant={"outline"} w={"100%"} >
      <CardHeader>
        <Flex gap={"20px"}><Center><Tooltip label={owner}><Avatar name={owner} /></Tooltip></Center>
        <Box>
        <Text fontSize={"xs"}>{unixToReadableDate(props.playedQuiz.endTime)} Uhr </Text>
        <b><Text>{owner}</Text></b>
        <Text>
          <b>{props.playedQuiz.points}{" "}
          {props.playedQuiz.points === 1 || props.playedQuiz.points === -1
            ? "Punkt"
            : "Punkte"}</b> in <b>{props.playedQuiz.playedTime} Sekunden</b> erreicht.
        </Text>
        </Box>
        </Flex>
      </CardHeader>
    </Card>
  );
}

export default PlayedQuizCard;
