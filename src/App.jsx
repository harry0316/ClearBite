import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import IngredientsSetting from "./pages/IngredientsSetting/IngredientsSetting";
import HomePage from "./pages/HomePage/Home";

function App() {
  return (
    <BrowserRouter>
      <main className="main">
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
          <Route path="/setting" element={<AuthForm />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
