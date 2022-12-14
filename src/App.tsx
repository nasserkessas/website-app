import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/about'
import HomePage from './pages/home'
import './css/App.css'
import PortfolioPage from './pages/portfolio'
import ContactPage from './pages/contact'

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/about' element={<AboutPage/>} />
            <Route path='/portfolio' element={<PortfolioPage />} />
            <Route path='/contact' element={<ContactPage />} />
        </Routes>
    )
}

export default App
