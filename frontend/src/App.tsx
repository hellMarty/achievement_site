import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import AchievementList from "./pages/AchievementList";
import Contact from "./pages/Contact";
import CreateAchievement from "./pages/CreateAchievement";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import MainNavbar from "./components/MainNavbar";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import "./styles/pages.css";

export default function App() {
    return (
        <body className="app">
            <MainNavbar />
            <div className="routes-body">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/achievement-list" element={<AchievementList />} />
                    <Route path="/achievement-new" element={<CreateAchievement />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <Footer />
        </body>
    
    )
}
