import React from 'react'
import { Heading, Text, Box } from '@chakra-ui/react'
import { useRealm } from "../provider/RealmProvider";

function Profile() {

    const app = useRealm();
    console.log(app.currentUser.identities);

    return (
        <>
            <Heading>Profil</Heading>
            <Box h="20px" />
            <Text>{app.currentUser.id}</Text>
            
        </>
    )
}

export default Profile