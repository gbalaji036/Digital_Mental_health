
import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ChatbotPage from './pages/ChatbotPage';
import ResourcesPage from './pages/ResourcesPage';
import DiseasesPage from './pages/DiseasesPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import FeedbackPage from './pages/FeedbackPage';
import FaqPage from './pages/FaqPage';
import Header from './components/Header';
import Footer from './components/Footer';
import PositivityWallPage from './pages/PositivityWallPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { EmergencyButton } from './components/IconComponents';
import ActivitiesPage, {
    WellbeingCheckInPage,
    WellbeingJournalingPage,
    WellbeingMindfulnessHubPage,
    WellbeingMindfulnessBreathingPage,
    WellbeingMindfulnessImmersivePage,
    WellbeingMindfulnessArtPage,
    WellbeingGamesHubPage,
    WellbeingGameMemoryPage,
    WellbeingGameJigsawPage,
    WellbeingStudyBreakPage,
    WellbeingInspirationPage,
    WellbeingYogaPage,
} from './pages/ActivitiesPage';
import SchedulePage from './pages/SchedulePage';

// A simple wrapper to check for admin session
const ProtectedAdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const isAuthenticated = sessionStorage.getItem('healer_admin_session') === 'active';
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const PageContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Header />}
      {/* The page-transition-wrapper class ensures a breeze-wipe effect on every route change */}
      <main 
        key={location.pathname} 
        className={`flex-grow page-transition-wrapper ${!isAdminPage ? 'pt-24 md:pt-32' : ''}`}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/check-in" element={<WellbeingCheckInPage />} />
          <Route path="/activities/journaling" element={<WellbeingJournalingPage />} />
          <Route path="/positivity-wall" element={<PositivityWallPage />} />
          <Route path="/activities/yoga" element={<WellbeingYogaPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboardPage /></ProtectedAdminRoute>} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          <Route path="/activities/mindfulness" element={<WellbeingMindfulnessHubPage />} />
          <Route path="/activities/mindfulness/breathing" element={<WellbeingMindfulnessBreathingPage />} />
          <Route path="/activities/mindfulness/immersive" element={<WellbeingMindfulnessImmersivePage />} />
          <Route path="/activities/mindfulness/art" element={<WellbeingMindfulnessArtPage />} />

          <Route path="/activities/games" element={<WellbeingGamesHubPage />} />
          <Route path="/activities/games/memory" element={<WellbeingGameMemoryPage />} />
          <Route path="/activities/games/jigsaw" element={<WellbeingGameJigsawPage />} />
          
          <Route path="/activities/study-break" element={<WellbeingStudyBreakPage />} />
          <Route path="/activities/inspiration" element={<WellbeingInspirationPage />} />
          <Route path="/diseases" element={<DiseasesPage />} />
          <Route path="/diseases/:slug" element={<ArticlePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/faq" element={<FaqPage />} />
        </Routes>
      </main>
      {!isAdminPage && <EmergencyButton />}
      {!isAdminPage && <Footer />}
    </div>
  );
};


function App() {
  return (
    <HashRouter>
      <div className="bg-dark-bg text-light-text/90 min-h-screen font-sans">
        <PageContent />
      </div>
    </HashRouter>
  );
}

export default App;
