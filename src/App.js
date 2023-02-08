import Layout from "./components/shared/Layout";
import AllToys from "./pages/AllToys";
import {Route,Routes} from "react-router-dom"
import AddToy from "./pages/AddToy";
import EditToy from "./pages/EditToy";
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
           <Route path="/" element={<AllToys/>}></Route>
           <Route path="/add-toy" element={<AddToy/>}></Route>
           <Route path="/edit-toy/:id" element={<EditToy/>}></Route>
        </Routes>
        </Layout>
    </div>
  );
}

export default App;
