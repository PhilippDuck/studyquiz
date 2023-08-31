import { Container, Select, Box } from "@chakra-ui/react";
import React from "react";
import HighscoreTable from "../components/HighscoreTable";
import { useEffect, useState } from "react";
import { useRealm } from "../provider/RealmProvider";

function Highscores() {
  const app = useRealm();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState("");

  useEffect(() => {
    async function getQuizzes() {
      if (app.currentUser) {
        const result = await app.currentUser.functions.getQuizzes(); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
        //console.log('Ergebnis der Funktion:', result);
        setQuizzes(result);
      } else {
        console.log("nicht eingeloggt");
      }
    }
    getQuizzes();
  }, []);

  return (
    <Container maxW={"2xl"}>
      <Select
        id="quiz"
        name="quiz"
        onChange={(e) => {
          setSelectedQuiz(e.target.value);
        }}
      >
        <option value="">Wählen ein Quiz</option>
        {quizzes.map((q, index) => (
          <option value={q._id} key={index}>
            {q.title}
          </option>
        ))}
      </Select>
      <Box h={"30px"} />
      <HighscoreTable quizId={selectedQuiz} />
    </Container>
  );
}

export default Highscores;
