import React from 'react'
import { useRealm } from "../provider/RealmProvider";
import { useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';

function Quizzes() {

    const app = useRealm();
    const [quizzes, setQuizzes] = useState();

    useEffect(()=> {
        async function getQuizzes() {
            const result = await app.currentUser.functions.getQuizzes(); // Ersetzen Sie 'IhreFunktionName' durch den Namen Ihrer Funktion
            console.log('Ergebnis der Funktion:', result);
            setQuizzes(result);
          }
          getQuizzes();
    },[])
    

  return (
    <>
    <Heading>Liste</Heading>
    {quizzes && quizzes.map((q)=> {
        return <p key={q._id}>{q.title}</p>
    })}
    </>
  )
}

export default Quizzes