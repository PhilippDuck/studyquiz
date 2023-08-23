import React from 'react'
import { QuestionIcon, WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";
import {

  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Highlight,
  Flex,
  Center,
  Spacer

} from "@chakra-ui/react";

function QuestionCard(props) {
  return (
    <Card  _hover={{ border: "1px" }} variant={"outline"} w="100%" >
      <CardBody>
        <Accordion allowMultiple>
          <AccordionItem border="none">
            <AccordionButton >
              <Flex w="100%">
              <Text size="sm" align="start">
                {props.question.question}
              </Text>
              <Spacer></Spacer>
              <AccordionIcon />
              </Flex>
            </AccordionButton>

            <AccordionPanel pb={4}>
              <VStack align={"start"} >

                <Heading size={"xs"}>Antworten:</Heading>
                <OrderedList>
                  {props.question.answers.map((q, i) => {

                    if (i == props.question.rightAnswer) {
                      return <Flex><ListItem key={i}>{q}</ListItem> <Box w="5px"></Box><Center><CheckCircleIcon color={"green.300"}></CheckCircleIcon></Center></Flex>
                    } else {
                      return <Flex><ListItem key={i}>{q}</ListItem><Box w="5px"></Box><Center><WarningIcon color={"red.300"}></WarningIcon></Center></Flex>
                    }

                  })}
                </OrderedList>


                <Heading size={"xs"}>Hinweis:</Heading>
                <Text>{props.question.hint}</Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  )
}

export default QuestionCard