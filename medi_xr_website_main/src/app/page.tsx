import { NavBar, Hero, Testimonials, Features, Company, Footer, Benefits, Products, Sponsors } from '@/components'
import Experts from '@/components/team/experts'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/keen-slider@6.8.6/keen-slider.min.css" rel="stylesheet" />
      </Head>
      <main className="pt-24 m-auto w-[100%] overflow-hidden">
        <div className="bg-hero-2">
          <NavBar />
          <Hero />
        </div>
        <section id="company">
          <Company />
        </section>
        <div className="mx-auto overflow-y-scroll bg-bg-5 bg-cover bg-fixed bg-center bg-no-repeat shadow-lg -mt-[200px] pt-[200px]">
          <section id="features" className="max-w-[1800px] mx-auto">
            <Features />
          </section>
          <section id="benefits">
            <Benefits />
          </section>
          <section id="products">
            <Products />
          </section>
          <section id="experts">
            <Experts />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section id="sponsors">
            <Sponsors />
          </section>
        </div>
      <Footer />
      </main>
    </>
  )
}


