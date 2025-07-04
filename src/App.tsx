import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/signin" element={<Auth signin={true} />} />
				
				<Route path="/" element={<LandingPage />} />

				<Route path="/signup" element={<Auth signup={true} />} />

				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>

		// <>
		//     <Dashboard />
		//     <Auth />
		// </>
	);
}

export default App;
