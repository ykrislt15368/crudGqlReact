import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {CREATE_NewToy} from '../graphql/toysMutation';
import { useMutation,gql } from '@apollo/client';
import { logger } from '../logger';

const AddToy = () =>{
   
    const name = useRef("");
    const price = useRef("");
    const imageUrl = useRef("");
    const navigate = useNavigate();

    const [addToy] = useMutation(CREATE_NewToy);

    // const addToyHandler = () => {
    //   addToy({
    //     variables: {
    //       name: name.current.value,
    //       imageUrl: imageUrl.current.value,
    //       price: Number(price.current.value),
    //     },
    //   }).then(() => {
    //     navigate("/");
    //   });
    // };

    const addToyHandler = () => {
      logger.info("Add Record Handler invoked");
      //logger.warn("Added warning");
      // logger.error("debug");
      //logger.success("sucess");
      
      addToy({
        variables: {
          name: name.current.value,
          imageUrl: imageUrl.current.value,
          price: Number(price.current.value),
        },
        update(cache, { data: { createToy } }) {
          cache.modify({
            fields: {
              allToys(existingToys = []) {
                const newToyRef = cache.writeFragment({
                  data: createToy,
                  fragment: gql`
                    fragment newToy on Todo {
                      id
                      name
                      price
                      imageUrl
                    }
                  `,
                });
                return [...existingToys, newToyRef];
              },
            },
          });
        },
      }).then(() => {
        navigate("/");
      });
      logger.info("Invoked Cache for adding record");
    };

    return(
        <>
            <Container className="mt-2">
              <Row>
                <Col className="col-md-8 offset-md-2">
                   <legend>Add a New Memeber in Team</legend>

                   <Form.Group className="mb-3" controlId="formName">
                     <Form.Label>Name</Form.Label>
                     <Form.Control type="text" ref={name}/>
                   </Form.Group>

                   <Form.Group className="mb-3" controlId="formPrice">
                     <Form.Label>Experience</Form.Label>
                     <Form.Control type="text" ref={price}/>
                   </Form.Group>

                   <Form.Group className="mb-3" controlId="formImageUrl">
                     <Form.Label>ImageUrl</Form.Label>
                     <Form.Control type="text" ref={imageUrl}/>
                   </Form.Group>
                
                   <Button type="button" variant="primary" onClick={addToyHandler}>Add</Button>

                </Col>
              </Row>
            </Container>
        </>
    )
};

export default AddToy;