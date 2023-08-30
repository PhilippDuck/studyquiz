import React from "react";
import {
    Card,
    CardHeader,
    VStack,
    Heading,
    Circle,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    Button,
    ButtonGroup,

} from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useLocation, Link } from "react-router-dom";


function ScoreCard(props) {

  function handleReapeatQuiz() {
    props.repeatQuiz();
  }

  return (
    <Card variant={"outline"} w={"100%"}>
      <CardHeader>
        <VStack spacing={10}>
          <Heading>Quiz beendet!</Heading>
          <Circle border={"2px"} size={40}>
            <Heading size={"4xl"}>
              {props.gameData.points.toString()}
            </Heading>
          </Circle>

          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>Fehler:</Td>
                  <Td isNumeric>{props.gameData.mistakes}</Td>
                </Tr>
                <Tr>
                  <Td>Benutze Hinweise:</Td>

                  <Td isNumeric>{props.gameData.usedHints}</Td>
                </Tr>
                <Tr>
                  <Td>Benötigte Zeit:</Td>

                  <Td isNumeric>{props.gameData.playedTime} s</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <ButtonGroup>
            <Link to={"/games"}>
              <Button>Beenden</Button>
            </Link>

            <Button
              leftIcon={<RepeatIcon />}
              colorScheme="primary"
              onClick={handleReapeatQuiz}
            >
              wiederholen
            </Button>
          </ButtonGroup>
        </VStack>
      </CardHeader>
    </Card>
  );
}

export default ScoreCard;
