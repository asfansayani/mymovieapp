import { Outlet } from 'react-router-dom'
import Header from './components/header'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
