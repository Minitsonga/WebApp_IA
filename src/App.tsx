import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Destinations from './components/Destinations'
import Quiz from './components/Quiz'
import Chatbot from './components/Chatbot'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Destinations />
        <Quiz />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
