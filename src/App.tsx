import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/Layout/MainLayout";
import { MainPage } from "./features/Main";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<MainPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
