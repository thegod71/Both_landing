import Header from './component/Header'
import './App.css'
import Footer from './component/Footer'
import Section3 from './component/Section3'
import Section5 from './component/Section5'
import Section6 from './component/Section6'
import FagSection from './component/FagSection'
import Hero from './component/Hero'
import PopupFormModal from './component/PopupFormModal'
import FloatingEnquiryBtn from './component/FloatingEnquiryBtn'
import { CounsellingModalProvider } from './context/CounsellingModalContext'

function App() {
  return (
    <CounsellingModalProvider autoOpen={true} autoOpenDelay={1200}>
      <Header />
      <Hero />
      <Section3 />
      <Section5 />
      <Section6 />
      <FagSection />
      <Footer />
      {/* Auto-popup lead form modal */}
      <PopupFormModal />
      {/* Quick floating action button to reopen form when closed */}
      <FloatingEnquiryBtn />
    </CounsellingModalProvider>
  )
}

export default App
