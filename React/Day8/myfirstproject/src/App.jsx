import { BrowserRouter,Routes,Route } from "react-router-dom";
import Register from "./component/Register";
import Home from "./component/Home";
const App=()=>{
  return(
    <><BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/" element={<Register/>}/></Routes></BrowserRouter>
      </>
  )
}
export default App;