import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GET_AllToys } from "../graphql/toysQuery";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { DELETE_ToyById } from "../graphql/toysMutation";
import DeleteConfirmation from "../components/shared/DeleteConformation";
import { logger } from '../logger';

//import {UPDATE_Toy} from '../graphql/toysMutation';
 
const AllToys = () => {
  const [allToysData, setAllToysData] = useState([]);
  const { data } = useQuery(GET_AllToys, {
    fetchPolicy: "no-cache",
  });
  const navigate = useNavigate();
 
  const [itemIDToDelete, setItemIDToDelete] = useState(0);
  const [showModal, setShowModal] = useState(false);
 
  const [deleteToy] = useMutation(DELETE_ToyById);
 
  useEffect(() => {
    logger.info("useEffect after componenet renderde");
    if (data?.allToys) {
      setAllToysData(data.allToys);
    }
  }, [data]);
 
  const openConfirmDeleteModalHandler = (id) => {
    logger.info("Delete Handler Modal conformed");
    setItemIDToDelete(id);
    setShowModal(true);
  };
 
  const closeConfirmDeleteModalHandler = () => {
    
    logger.info("Modal Closed");
    setItemIDToDelete(0);
    setShowModal(false);
  };
 
  // const confirmDeleteHandler = () => {
  //   deleteToy({
  //     variables: {
  //       id: itemIDToDelete,
  //     },
  //   }).then(() => {
  //     setAllToysData((existingData) => {
  //       return existingData.filter((_) => _.id != itemIDToDelete);
  //     });
  //     setItemIDToDelete(0);
  //     setShowModal(false);
  //   });
  // };



  const confirmDeleteHandler = () => {
    
    
    logger.info("Delete Handler method invoked");
    deleteToy({
      variables: {
        id: itemIDToDelete,
      },
      update(cache, { data: { removeToy } }) {
        cache.modify({
          fields: {
            allToys(existingData = [], { readField }) {
              existingData = existingData.filter(
                (toy) => (readField("id", toy)!== removeToy.id)
              );
              return existingData;
            },
          },
        });
      },
    }).then(() => {
      setAllToysData((existingData) => {
        return existingData.filter((_) => _.id !== itemIDToDelete);
      });
      setItemIDToDelete(0);
      setShowModal(false);
    });
    logger.info("Delete Handler cache updated");
    
  };
 


  return (
    <>
      <DeleteConfirmation
        showModal={showModal}
        title="Delete Confirmation"
        body="Are you sure you want to delete item?"
        closeConfirmDeleteModalHandler={closeConfirmDeleteModalHandler}
        confirmDeleteHandler={confirmDeleteHandler}
      ></DeleteConfirmation>

      <Container className="mt-2">

        <Row>
          <Col className="col-md-4 offset-md-4">
            <Button
              variant="primary"
              type="button"
              style={{ marginTop: "20px" ,marginBottom: "20px",width: "350px"}}
              onClick={() => {
                navigate("/add-toy");
              }}
            >
              Add
            </Button>
          </Col>
        </Row>
        <Row xs={1} md={3} className="g-4">
          {allToysData.map((toy) => (
            <Col key={toy.id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={toy.imageUrl}
                  style={{ height: 250, width: "100%" }}
                />
                <Card.Body>
                  <Card.Title>{toy.name}</Card.Title>
                  <Card.Text>Experience - {toy.price}yrs</Card.Text>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => navigate(`/edit-toy/${toy.id}`)}
                  >
                    Edit
                  </Button>
                  |
                  <Button
                    variant="danger"
                    type="button"
                    onClick={() => openConfirmDeleteModalHandler(toy.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default AllToys;