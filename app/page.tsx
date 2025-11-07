'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Benefits from '@/components/Benefits'
import CourseDetails from '@/components/CourseDetails'
import TargetAudience from '@/components/TargetAudience'
import Curriculum from '@/components/Curriculum'
import Instructor from '@/components/Instructor'
import BonusEbook from '@/components/BonusEbook'
import Registration from '@/components/Registration'
import SocialProof from '@/components/SocialProof'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Benefits />
      <CourseDetails />
      <TargetAudience />
      <Curriculum />
      <Instructor />
      <BonusEbook />
      <Registration />
      <SocialProof />
      <FAQ />
      <Footer />
    </main>
  )
}
