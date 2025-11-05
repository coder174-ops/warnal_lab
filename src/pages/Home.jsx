import React from 'react'
import Service from './Service'
import PinterestGallery from '../components/PinterestGallery'
import MeetOurTeam from '../components/MeetOurTeam'
import FAQSection from './FAQSection'
import FloatingImageEffect from './FloatingImageEffect'
import Footer from '../components/Footer'
import Partner from './Partner'
import ProjectsSection from './ProjectSection'

const Home = () => {
  return (
    <div>
      <FloatingImageEffect />
      <Service />
      <ProjectsSection />
      <PinterestGallery />
      <Partner />
      <MeetOurTeam />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default Home