import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  VStack,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { Form, useFormik } from "formik";
import * as Yup from "yup";

function AddQuestionDrawer(props) {
  function cancelAddQuestion() {
    props.onClose();
    formik.resetForm();
  }

  const formik = useFormik({
    initialValues: {
        question: '',
        answers: ['', '', '', ''],
        rightAnswer: '',
        hint: ''
    },
    validationSchema: Yup.object({
        question: Yup.string().required('Frage ist erforderlich'),
        answers: Yup.array()
            .of(Yup.string().required('Antwort ist erforderlich'))
            .min(2, 'Mindestens zwei Antworten sind erforderlich'),
        rightAnswer: Yup.string().required('Richtige Antwort auswählen'),
    }),
    onSubmit: values => {
        
        props.addNewQuestion(values);
        props.onClose();
    },
});

  return (
    <Drawer
      size="sm"
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <form onSubmit={formik.handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Frage hinzufügen</DrawerHeader>

          <DrawerBody>
            <VStack spacing={4}  margin="0 auto">
              <FormControl
                isInvalid={formik.touched.question && formik.errors.question}
              >
                <FormLabel htmlFor="question">Frage</FormLabel>
                <Input
                  id="question"
                  name="question"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.question}
                />
                <FormErrorMessage>{formik.errors.question}</FormErrorMessage>
              </FormControl>

              {formik.values.answers.map((answer, index) => (
                <FormControl key={index} isInvalid={formik.touched.answers?.[index] && formik.errors.answers?.[index]}>
                    <FormLabel htmlFor={`answers[${index}]`}>Antwort {index + 1}</FormLabel>
                    <Input
                        id={`answers[${index}]`}
                        name={`answers[${index}]`}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={answer}
                    />
                    <FormErrorMessage>{formik.errors.answers?.[index]}</FormErrorMessage>
                </FormControl>
            ))}

<FormControl isInvalid={formik.touched.rightAnswer && formik.errors.rightAnswer}>
                <FormLabel htmlFor="rightAnswer">Richtige Antwort</FormLabel>
                <Select
                    id="rightAnswer"
                    name="rightAnswer"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.rightAnswer}
                >
                    <option value="">Wählen Sie eine Option</option>
                    {formik.values.answers.map((_, index) => (
                        <option value={index} key={index}>
                            Antwort {index + 1}
                        </option>
                    ))}
                </Select>
                <FormErrorMessage>{formik.errors.rightAnswer}</FormErrorMessage>
            </FormControl>

              <FormControl>
                <FormLabel htmlFor="hint">Hinweis</FormLabel>
                <Input
                  id="hint"
                  name="hint"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.hint}
                />
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button mr={"2"} onClick={() => cancelAddQuestion()}>
              Abbrechen
            </Button>
            <Button colorScheme="teal" type="submit">
              Frage hinzufügen
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}

export default AddQuestionDrawer;
