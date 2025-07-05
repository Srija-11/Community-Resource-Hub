import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './config/firebase'; // adjust path if needed
import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';
import { Auth } from './components/auth';
import { Signup } from './components/Signup';
import ResourceForm from './components/Resourceform';
import ResourceList from './components/ResourceList';
import WeatherAlert from './components/WeatherAlert';
import EmergencyInfo from './components/EmergencyInfo';
import DisasterNews from './components/DisasterNews';

export default function App() {
  const [user, setUser] = useState(null);

  // 🔐 Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Header user={user} />

      <Routes>
        {/* 🏠 Home */}
        <Route
          path="/"
          element={
            <div className="App">
              <Hero />

              <section className="card-grid">
                {/* Card 1: SOS Map */}
                <Card
                  img="https://static.vecteezy.com/system/resources/previews/029/927/235/non_2x/sos-emergency-call-911-calling-a-cry-for-help-stock-illustration-vector.jpg"
                  title="Real-Time SOS & Maps"
                  desc="Safe zones · Shelters · Medical facilities"
                  cta="View Locations"
                  link="/sos/map"
                />

                {/* Card 2: Resource Matching */}
                <Card
                  img="https://static.vecteezy.com/system/resources/thumbnails/011/933/954/small/social-network-silhouette-icon-business-technology-community-world-company-black-pictogram-networking-hub-media-information-communication-icon-isolated-illustration-vector.jpg"
                  title="Resource Matching"
                  desc="Find or offer resources · Agencies"
                  cta="Find / Offer Resources"
                  link= "/resources/new"
                  ctaanother="View All Resources"
                  linkanother="/resources/view"
                />
                {/* Card 3: Emergency Info */}
                <Card
                  img="https://static.wixstatic.com/media/7c6edd_54bfe982e1f145bc9de2b3b484dda087~mv2.png/v1/fill/w_980,h_1107,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/7c6edd_54bfe982e1f145bc9de2b3b484dda087~mv2.png"
                  title="Emergency Information"
                  desc="Government & host updates"
                  cta="Get Updates"
                  link="/alerts"
                  ctaanother="Emergency Updates"
                  linkanother="/updates"
                />

                {/* Card 4: Community Support */}
                <Card
                  img="https://www.armaghbanbridgecraigavon.gov.uk/wp-content/uploads/2018/11/community-economy-place.png"
                  title="Community Support"
                  desc="Collaborate now"
                  cta="Volunteer Signup"
                  link="/volunteer"
                />
              </section>

              <Footer />
            </div>
          }
        />

        {/* 🔐 Auth */}
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />

        {/* 💾 Resource System */}
        <Route path="/resources/new" element={<ResourceForm />} />
        <Route path="/resources/view" element={<ResourceList />} />

               {/* ⚠️ Emergency Info – Weather Alert Page */}
        <Route
          path="/alerts"
          element={
            <>
              <WeatherAlert />
              <DisasterNews />
            </>
          }
        />
        <Route path="/updates" element={<EmergencyInfo />} />

      </Routes>
    </Router>
  );
}
