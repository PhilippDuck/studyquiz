import React from 'react'
import { Heading, Box, Button, Center, VStack} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
        <Center h="100vh">
            <VStack>
                <Heading size={"4xl"}>Ooops!</Heading>
                <Heading>404 - Seite nicht gefunden</Heading>
                <Box h={"20px"} />
                <Link to={"/"}><Button size={"lg"} colorScheme={"teal"}>Zur App</Button></Link>
            </VStack>
        </Center>
    </>
  )
}

export default NotFound