import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Layout=({children})=>{
    return <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Publicis Employee</Navbar.Brand>
        </Container>
      </Navbar> 

      <Container>
        {children}
      </Container> 
      
    </>
  
}




export default Layout;