import { lazy, Suspense } from "solid-js";
import { Routes, Route, Navigate } from "solid-app-router"
import MenuNav from "./components/Layout/MenuNav";
import LoadingSpinner from "./components/UI/LoadingSpinner";


const Home = lazy(() => import("./pages/Home"));
const WeighingSession = lazy(() => import("./pages/WeighingSession"));

function App() {
	return (
		<div className="app">
			<Suspense fallback={<div className="centered"><LoadingSpinner /></div>}>
				<Routes>
					<Route path="/" element={<Navigate replace href="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/session/new" element={<WeighingSession />} />
				</Routes>
			</Suspense>
		</div>
	);
}

export default App;
