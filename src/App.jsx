import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/SignIn" element={<SignupPage />} />
          
          <Route path="/home" element={<SignupPage />} />


        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
