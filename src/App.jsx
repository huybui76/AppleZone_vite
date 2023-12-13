import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import Footer from './components/Footer/Footer'
import { routes } from './routes'

const Main = ({ children, isNavbar = true, isFooter = true }) => (
  <div>
    {isNavbar && <Navbar />}
    {children}
    {isFooter && <Footer />}
  </div>
)

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const Page = route.page
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Main isNavbar={route.isNavbar} isFooter={route.isFooter}>
                  <Page />
                </Main>
              }
            />
          )
        })}
      </Routes>
    </Router>
  )
}

export default App
