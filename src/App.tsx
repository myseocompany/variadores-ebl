import HeaderLead from './components/HeaderLead';
import { ProductBanner } from './components/ProductBanner';
import Benefits from './components/Benefits';
import Trust from './components/Trust';
import Products from './components/Products';
import QuoteForm from './components/QuoteForm';

import Footer from './components/Footer';
import TrainingGallery from './components/TrainingGallery';


function App() {
  return (
    <div className="min-h-screen">
      <HeaderLead />
      <ProductBanner />
      <Benefits />
      <Trust />
      <Products />
      <QuoteForm />
      <TrainingGallery />
      <Footer />
    </div>
  );
}

export default App;
