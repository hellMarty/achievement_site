import React from "react";
import { Route, Routes } from "react-router-dom";
import useSWR from "swr";
import Footer from "./components/Footer";
import MainNavbar from "./components/MainNavbar";
import fetcher from "./models/fetcher";
import About from "./pages/About";
import AchievementList from "./pages/AchievementList";
import Contact from "./pages/Contact";
import CreateAchievement from "./pages/CreateAchievement";
import Editor from "./pages/Editor";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import OpenAchievements from "./pages/OpenAchievements";
import Profile from "./pages/Profile";
import Themes from "./pages/Themes";
import "./styles/pages.css";

export default function App() {
    // Initial Theme fetch. Should set the theme for the App
    const { data, error } = useSWR(`${import.meta.env.VITE_APP}theme/active`, fetcher);

    if (error) return <div>failed to load </div>
    if (!data) return <div>loading...</div>

    return (
        <div className="app">
            <MainNavbar />
            <div className="routes-body">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/achievement-list" element={<AchievementList />} />
                    <Route path="/achievement-open" element={<OpenAchievements />} />
                    <Route path="/achievement-new" element={<CreateAchievement />} />
                    <Route path="/themes" element={<Themes />} />
                    <Route path="/editor" element={<Editor />} />

                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}
