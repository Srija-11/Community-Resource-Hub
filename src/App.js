import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './config/firebase';
import Header from './components/Header';
import Hero from './components/Hero';
import Card from './components/Card';
import Footer from './components/Footer';
import { Auth } from './components/auth';
import { Signup } from './components/Signup';
import ResourceForm from './components/Resourceform';
import ResourceList from './components/ResourceList';
<<<<<<< Updated upstream
import WeatherAlert from './components/WeatherAlert';
import EmergencyInfo from './components/EmergencyInfo';
import DisasterNews from './components/DisasterNews';
import VolunteerForm from './components/VolunteerForm';
import VolunteerList from './components/VolunteerList';
import SupportGroups from './components/SupportGroups';
import SkillsBoard from './components/SkillsBoard';
import EmergencyDocs from './components/EmergencyDocs';
import DamageReportForm from './components/DamageReportForm';
import VerifiedRepairServices from './components/VerifiedRepairServices';
import RecoveryDirectory from './components/RecoveryDirectory';
import InsuranceHelp from './components/InsuranceHelp';
=======
import SOSForm from './components/SOSForm';       // 🆕 Added
import SOSMap from './components/SOSMap';         // 🆕 Added
>>>>>>> Stashed changes

export default function App() {
  const [user, setUser] = useState(null);

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
        <Route
          path="/"
          element={
            <div className="App">
              <Hero />
              <section className="card-grid">
                <Card
                  img="https://static.vecteezy.com/system/resources/previews/029/927/235/non_2x/sos-emergency-call-911-calling-a-cry-for-help-stock-illustration-vector.jpg"
                  title="Real-Time SOS & Maps"
                  desc="Safe zones · Shelters · Medical facilities"
                  cta="View Locations"
                  link="/sos/map"
                  ctaanother="Submit SOS"
                  linkanother="/sos/new"
                />
                <Card
                  img="https://static.vecteezy.com/system/resources/thumbnails/011/933/954/small/social-network-silhouette-icon-business-technology-community-world-company-black-pictogram-networking-hub-media-information-communication-icon-isolated-illustration-vector.jpg"
                  title="Resource Matching"
                  desc="Find or offer resources · Agencies"
                  cta="Find / Offer Resources"
                  link="/resources/new"
                  ctaanother="View All Resources"
                  linkanother="/resources/view"
                />
                <Card
                  img="https://static.wixstatic.com/media/7c6edd_54bfe982e1f145bc9de2b3b484dda087~mv2.png"
                  title="Emergency Information"
                  desc="Government & host updates"
                  cta="Get Updates"
                  link="/alerts"
                  ctaanother="Emergency Updates"
                  linkanother="/updates"
                />
                <Card
                  img="https://www.armaghbanbridgecraigavon.gov.uk/wp-content/uploads/2018/11/community-economy-place.png"
                  title="Community Support"
                  desc="Collaborate now"
                  cta="Volunteer Signup"
                  link="/volunteer"
                  ctaanother="Support & Skills"
                  linkanother="/support-groups"
                />
                <Card
                  img="https://cdn-icons-png.flaticon.com/512/3938/3938621.png"
                  title="Recovery Assistance"
                  desc="Repair · Insurance · Directory"
                  cta="Start Recovery"
                  link="/recovery/report"
                  ctaanother="Verified Services"
                  linkanother="/recovery/verified"
                  ctathird="Recovery Directory"
                  linkthird="/recovery/directory"
                />
                <Card
                  img="https://cdn-icons-png.flaticon.com/512/1067/1067357.png"
                  title="Insurance Help"
                  desc="Claim process · Resources · Links"
                  cta="Insurance Guide"
                  link="/insurance-help"
                />
              </section>
              <Footer />
            </div>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />

<<<<<<< Updated upstream
        {/* Resource System */}
        <Route path="/resources/new" element={<ResourceForm />} />
        <Route path="/resources/view" element={<ResourceList />} />

        {/* Emergency Info */}
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

        {/* Community Support */}
        <Route path="/volunteer" element={<VolunteerForm />} />
        <Route path="/volunteers" element={<VolunteerList />} />
        <Route path="/support-groups" element={<SupportGroups />} />
        <Route path="/skills" element={<SkillsBoard />} />
        <Route path="/docs" element={<EmergencyDocs />} />

        {/* Recovery Assistance */}
        <Route path="/recovery/report" element={<DamageReportForm />} />
        <Route path="/recovery/verified" element={<VerifiedRepairServices />} />
        <Route path="/recovery/directory" element={<RecoveryDirectory />} />
        <Route path="/insurance-help" element={<InsuranceHelp />} />

        {/* SOS Placeholder */}
        <Route path="/sos/map" element={<div><h3>SOS Map Coming Soon</h3></div>} />
=======
        {/* 💾 Resource Matching */}
        <Route path="/resources/new" element={<ResourceForm />} />
        <Route path="/resources/view" element={<ResourceList />} />

        {/* 🆘 SOS System */}
        <Route path="/sos/new" element={<SOSForm />} />
        <Route path="/sos/map" element={<SOSMap />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}