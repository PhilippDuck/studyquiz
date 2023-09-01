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

  useEffect(() => {
    getHighscoreByQuizId(selectedQuiz);
  }, [selectedQuiz])

  const [highscores, setHighscores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <HighscoreTable highscores={highscores} isLoading={isLoading} />
    </Container>
  );
}

export default Highscores;
