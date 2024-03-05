import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import AchievementList from "./components/AchievementList";
import Contact from "./components/Contact";
import CreateAchievement from "./components/CreateAchievement";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import MyNavbar from "./components/MyNavbar";
import ErrorPage from "./components/ErrorPage";

export default function App() {
    return (
        <body className="app">
            <MyNavbar />       
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/achievement-list" element={<AchievementList />} />
                <Route path="/achievement-new"  element={<CreateAchievement />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </body>
    )
}
