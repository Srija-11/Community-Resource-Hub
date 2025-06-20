import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="App">
      <Header />

      <Hero />

      <section className="card-grid">
        <Card
          img="https://source.unsplash.com/600x400?map"
          title="Real‑Time SOS & Maps"
          desc="Safe zones · Shelters · Medical facilities"
          cta="View Locations"
        />
        <Card
          img="https://source.unsplash.com/600x400?volunteer"
          title="Resource Matching"
          desc="Find or offer resources · Agencies"
          cta="Find / Offer Resources"
        />
        <Card
          img="https://source.unsplash.com/600x400?weather-alert"
          title="Emergency Information"
          desc="Government & host updates"
          cta="Get Updates"
        />
        <Card
          img="https://source.unsplash.com/600x400?community"
          title="Community Support"
          desc="Collaborate now"
          cta="Volunteer Signup"
        />
      </section>

      <Footer />
    </div>
  );
}
