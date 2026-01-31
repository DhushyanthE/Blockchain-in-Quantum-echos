
import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CryptoMarket from "./pages/CryptoMarket";
import Wallet from "./pages/Wallet";
import QuantumOperations from './pages/QuantumOperations';
import QuantumAI from './pages/QuantumAI';
import QuantumCircuits from './pages/QuantumCircuits';
import AGIDashboard from './pages/AGIDashboard';
import { TranslationProvider } from './contexts/TranslationContext';
import { WalletProvider } from './contexts/wallet-context';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  // Note: The hash router is used because it works well with Lovable's preview pane
  // For production, you might want to use BrowserRouter instead
  return (
    <TranslationProvider initialLanguage="en">
      <WalletProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/crypto-market" element={<CryptoMarket />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/quantum-operations" element={<QuantumOperations />} />
            <Route path="/quantum-ai" element={<QuantumAI />} />
            <Route path="/quantum-circuits" element={<QuantumCircuits />} />
            <Route path="/agi-dashboard" element={<AGIDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </HashRouter>
      </WalletProvider>
    </TranslationProvider>
  );
}

export default App;
