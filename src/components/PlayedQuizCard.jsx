import React from "react";
import { useState, useEffect } from "react";
import {Card, Text, CardHeader, } from "@chakra-ui/react";
import { useRealm } from "../provider/RealmProvider";


function PlayedQuizCard(props) {
    const [owner, setOwner] = useState("");
    const app = useRealm();
    

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
        <Text>{owner}</Text>
        <Text>{props.playedQuiz.playedTime} Sekunden</Text>
        <Text>
          {props.playedQuiz.points}{" "}
          {props.playedQuiz.points === 1 || props.playedQuiz.points === -1
            ? "Punkt"
            : "Punkte"}
        </Text>
      </CardHeader>
    </Card>
  );
}

export default PlayedQuizCard;
