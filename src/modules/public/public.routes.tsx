
import { Navigate, Route, Routes } from "react-router-dom"
import { FC } from "react";
import { BoardPage } from "./pages/BoardPage/BoardPage";
// import { HomePage } from "./pages/HomePage";

export const Public_routes: FC = () => {

    return (
        <Routes>
            <Route path='board' index element={<BoardPage />} />
            <Route path="/*" element={<Navigate to="/board" replace />} />
        </Routes>
    )

}
