import InputForm from "./Components/Input";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportForm from "./Components/ReportForm";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputForm/>}/>
          <Route path="/reportPage" element={<ReportForm/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
