import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import TopBar from '../components/TopBar'
import WhatsAppButton from '../components/WhatsAppButton'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#24384d]">
      <TopBar />
      <Header />
      <Outlet />
      <WhatsAppButton />
      <Footer />
    </div>
  )
}