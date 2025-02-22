import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm/AuthForm";
import IngredientsSetting from "./pages/IngredientsSetting/IngredientsSetting";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";

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
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
