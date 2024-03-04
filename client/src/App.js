import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import MyNavbar from "./components/MyNavbar";
import Home from "./pages/home";
import About from "./pages/about";
import AchievementList from "./pages/achievementList";
import CreateAchievement from "./pages/createAchievement";
import Contact from "./pages/contact";
import User from "./pages/user";



function App() {
	return (
		<BrowserRouter>
			<MyNavbar />
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/achievementList" element={<AchievementList />} />
				<Route path="/createAchievement" element={<CreateAchievement />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
