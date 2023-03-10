import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useMutation, useQuery,gql } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
//import {UPDATE_Toy} from "../graphql/toysMutation";
import {UPDATE_Toy} from '../graphql/toysMutation';
import {GET_ToyById} from "../graphql/toysQuery";
import { logger } from '../logger';

const EditToy = () => {
    
  const name = useRef("");
  const imageUrl = useRef("");
  const price = useRef("");
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useQuery(GET_ToyById, {
    fetchPolicy: "no-cache",
    variables: { id: Number(id) 
    },
  });

  useEffect(() => {
    if (data?.Toy) {
      name.current.value = data.Toy.name;
      price.current.value = data.Toy.price;
      imageUrl.current.value = data.Toy.imageUrl;
    }
  }, [data]);
 
  const [updateToy] = useMutation(UPDATE_Toy);
    

    
    
    
  // const updateToyHandler = () => {
  //   updateToy({
  //     variables: {
  //       id: Number(id),
  //       name: name.current.value,
  //       imageUrl: imageUrl.current.value,
  //       price: Number(price.current.value),
  //     },
  //   }).then(() => {
  //     navigate("/");
  //   });
  // };


  const updateToyHandler = () => {
    logger.info("Update Record handler invoked");
    updateToy({
      variables: {
        id: Number(id),
        name: name.current.value,
        imageUrl: imageUrl.current.value,
        price: Number(price.current.value),
      },
      update(cache, { data: { updateToy } }) {
        cache.modify({
          fields: {
            allToys(existingData = [], { readField }) {
              existingData = existingData.filter(
                (item) => updateToy.id !== readField("id", item)
              );
              const updatToyRef = cache.writeFragment({
                data: updateToy,
                fragment: gql`
                  fragment newToy on Toy {
                    id
                    name
                    price
                    imageUrl
                  }
                `,
              });
              return [...existingData, updatToyRef];
            },
          },
        });
      },
    }).then(() => {
      navigate("/");
    });
    logger.info("Updated Cache for updating record ");
  }

    return(
        <>
            <Container className="mt-2">
              <Row>
                <Col className="col-md-8 offset-md-2">
                   <legend>Update a Employee In Team</legend>

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
                
                   <Button type="button" variant="primary" onClick={updateToyHandler}>Update</Button>

                </Col>
              </Row>
            </Container>
        </>
    )
};
export default EditToy;