import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { CssBaseline } from '@mui/material';
import ProtectedRoute from './utils/ProtectedRoute';
import LandingPage from './pages/Landing/LandingPage';
import SignupPage from './pages/Auth/SignupPage';
import LoginPage from './pages/Auth/LoginPage';
import Homepage from './pages/HomePage/HomePage';
import AddItemPage from './pages/Items/AddItemPage';
import CreatePreferencePage from './pages/Preferences/CreatePreferencePage';
import EditPreferencePage from './pages/Preferences/EditPrefrencePage';
import ItemsPage from './pages/Items/ItemsPage';
import EditItemPage from './pages/Items/EditItemPage';
import CreateOutfitPage from './pages/CreateOutfitPage';
import OutfitsPage from './components/Outfits/outfitsDisplayPage'
import EditOutfitPage from './pages/EditOutfitPage';
import Layout from './components/Layout/layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/preferences" element={<CreatePreferencePage />} />
          
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/items/add" element={<AddItemPage />} />
            <Route path="/items/edit/:id" element={<EditItemPage />} />
            <Route path="/outfits" element={<OutfitsPage />} />
            <Route path="/outfits/create" element={<CreateOutfitPage />} />
            <Route path="/outfits/:id" element={<EditOutfitPage />} />
            <Route path="/preferences/edit" element={<EditPreferencePage />} />
          </Route>
        </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;