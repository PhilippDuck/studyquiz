import React from 'react'
import {

    Text,

    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
  } from "@chakra-ui/react";

function QuestionCard() {
  return (
    <Card w="100%">
    <CardBody>
      <Accordion allowMultiple>
        <AccordionItem border="none">
          <AccordionButton>
            <Text size="xs">
              Was ist der Unterschied zwischen RAM und ROM?
            </Text>
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
  )
}

export default QuestionCard