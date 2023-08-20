import { Routes, Route } from 'react-router-dom'
import './App.css'
import SideBar from './components/sidebar'
import Contacts from './pages/contacts'
import ContactsId from './pages/contactDetail'
import NewContact from './pages/newContact'
import ChartAndMap from './pages/chartAndMap'
import Index from './pages'

function App() {

  return (
    <>
      <div className='flex flex-row'>
        <SideBar />
        <Routes>
          <Route path='/contact/new' element={<NewContact />} />
          <Route path='/contact/:id' element={<ContactsId />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/chart-and-map' element={<ChartAndMap />} />
          <Route path='/' element={<Index />} />
        </Routes>
      </div>
    </>
  )
}

export default App
