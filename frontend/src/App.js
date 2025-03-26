import { BrowserRouter, Routes, Route } from "react-router-dom";

import Mainform from "./mainform/Mainform";
import Loginpage from "./loginpage/Loginpage";
import Apppage from "./apppage/Apppage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainform />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/apppage" element={<Apppage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
