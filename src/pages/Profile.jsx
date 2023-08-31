import React, { useState } from 'react'
import {
    Heading, Text, Box, Avatar, Center, VStack, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Input,
    IconButton,
    Container
} from '@chakra-ui/react'
import { useRealm } from "../provider/RealmProvider";
import {MdOutlineModeEditOutline} from "react-icons/md"

function Profile() {

    const app = useRealm();
    const { isOpen, onOpen, onClose } = useDisclosure();
    let newNickname = "";
    const [nickname, setNickname] = useState(app.currentUser.customData.nickname);

    async function addNicknameToCustomUserData(nickname) {
        const mongo = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongo.db("studyquiz").collection("userData");

        // Füge benutzerdefinierte Daten für den aktuellen Benutzer hinzu
        const result = await collection.updateOne(
            { userData_id: app.currentUser.id },
            { $set: { nickname: nickname } },
            { upsert: true });
        console.log(result);
        await app.currentUser.refreshCustomData();
        setNickname(nickname);
        onClose();
    }




    return (
        <Container maxW={"2xl"}>
            <Heading>Profil</Heading>
            <Center>
                <VStack spacing={"20px"}>
                    <Avatar name={nickname} size={"2xl"} />
                    <Text onClick={onOpen} fontSize={"xl"}>{nickname}</Text>
                    <IconButton
                        isRound={true}
                        variant='solid'
                        aria-label='change Nickname'
                        fontSize='20px'
                        onClick={onOpen}
                        icon={<MdOutlineModeEditOutline />}
                    />

                </VStack>

            </Center>

        


            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>Nickname ändern</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input onChange={(e) => { newNickname = e.target.value }}></Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={() => addNicknameToCustomUserData(newNickname)}>
                            Speichern
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Container>
    )
}

export default Profile