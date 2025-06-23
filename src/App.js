import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';
import { Auth } from './components/auth';

export default function App() {
  return (
    <div className="App">
      <Auth />
      <button></button>
      <Header />

      <Hero />

      <section className="card-grid">
        <Card
          img="https://family-locator.com/content/homepage/sections/2-family-locator-app-keeps-your-family-secure-connected/sg_b2c_familyweb_videopic-1.png"
          title="Real‑Time SOS & Maps"
          desc="Safe zones · Shelters · Medical facilities"
          cta="View Locations"
          
        />
        <Card
          img="https://static.vecteezy.com/system/resources/thumbnails/011/933/954/small/social-network-silhouette-icon-business-technology-community-world-company-black-pictogram-networking-hub-media-information-communication-icon-isolated-illustration-vector.jpg"
          title="Resource Matching"
          desc="Find or offer resources · Agencies"
          cta="Find / Offer Resources"
        />
        <Card
          img="https://static.wixstatic.com/media/7c6edd_54bfe982e1f145bc9de2b3b484dda087~mv2.png/v1/fill/w_980,h_1107,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/7c6edd_54bfe982e1f145bc9de2b3b484dda087~mv2.png"
          title="Emergency Information"
          desc="Government & host updates"
          cta="Get Updates"
        />
        <Card
          img="https://www.armaghbanbridgecraigavon.gov.uk/wp-content/uploads/2018/11/community-economy-place.png"
          title="Community Support"
          desc="Collaborate now"
          cta="Volunteer Signup"
        />
      </section>

      <Footer />
    </div>
  );
}
