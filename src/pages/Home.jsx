import React from 'react'
import Service from './Service'
import PinterestGallery from '../components/PinterestGallery'
import MeetOurTeam from '../components/MeetOurTeam'
import FAQSection from './FAQSection'
import FloatingImageEffect from './FloatingImageEffect'

const Home = () => {
  return (
    <div>
      <FloatingImageEffect />
      <Service />
      <PinterestGallery />
      <MeetOurTeam />
      <FAQSection />
    </div>
  )
}

export default Home