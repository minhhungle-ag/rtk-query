import { Route, Routes } from "react-router-dom";
import HomePage from "../HomePage/pages";

export function MainPage() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
