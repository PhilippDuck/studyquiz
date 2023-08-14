import React from "react";
import {
  Center,
  Text,
  VStack,
  HStack,
  Icon,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

function Create() {
  return (
    <>
      <Center w="100%">
        <FormControl>
          <FormLabel>Titel:</FormLabel>
          <Input type="text" />
          
        </FormControl>
      </Center>
      <Box h="20px"></Box>
      <Heading size="lg">Fragen</Heading>
      <Box h="10px"></Box>
      <Card w="100%">
        <CardBody>
          
            <Accordion  allowMultiple>
              <AccordionItem border="none">
                <AccordionButton>
                 
                  <Text size="xs">Was ist der Unterschied zwischen RAM und ROM?</Text>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <ul>
                    <li>1. Test</li>
                    <li>2. Test</li>
                    <li>3. Test</li>
                    <li>4. Test</li>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          
        </CardBody>
      </Card>
      <Box h="10px"></Box>
      <Card w="100%">
        <CardBody>
          
            <Accordion  allowMultiple>
              <AccordionItem border="none">
                <AccordionButton>
                 
                  <Text size="xs">Was ist der Unterschied zwischen RAM und ROM?</Text>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <ul>
                    <li>1. Test</li>
                    <li>2. Test</li>
                    <li>3. Test</li>
                    <li>4. Test</li>
                  </ul>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          
        </CardBody>
      </Card>
    </>
  );
}

export default Create;
