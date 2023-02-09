import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';


const Layout=({children})=>{
    return <>
      <Navbar bg="dark" variant="dark">
        <Container>
        <Nav className="mx-auto">
          <Navbar.Brand href="#home">Publicis Employee</Navbar.Brand>
        </Nav>
        </Container>
      </Navbar> 

      <Container>
        {children}
      </Container> 

    </>
  
}




export default Layout;