import React, { useState } from 'react'
import unixToReadableDate from '../helperFunctions/unixTimeToReadable'
import { VStack, Text } from '@chakra-ui/react'
import { useEffect } from 'react';

function DateAndTime(props) {

    const [dateTime, setDateTime] = useState(
        {
            formattedDate:"jb",
            formattedTime:"jgb"
        }
    );

    useEffect(()=> {
         const datetime = unixToReadableDate(props.timestamp)
         setDateTime(datetime);
    }, [])

  return (
    <VStack>
        <Text>{dateTime.formattedDate}</Text>
        <Text>{dateTime.formattedTime} Uhr</Text>
    </VStack>
  )
}

export default DateAndTime