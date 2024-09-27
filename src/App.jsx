import './App.css'
import Home from './pages/Home'
import TimerButton from './pages/Test'
import { Route, Routes } from 'react-router'


function App() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
		</Routes>
	)
}

export default App
