import React from 'react'
import { Heading, Box, Button, Center, VStack} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons'

function NotFound() {
  return (
    <>
        <Center h="100vh">
            <VStack spacing={"20px"}>
                <Heading size={"4xl"}>Ooops!</Heading>
                <Heading>404 - Seite nicht gefunden</Heading>
                <Box/>
                <Link to={"/"}>
                    <Button leftIcon={<ArrowBackIcon/>} size={"lg"} colorScheme={"teal"}>Zurück zur App</Button>
                </Link>
            </VStack>
        </Center>
    </>
  )
}

export default NotFound