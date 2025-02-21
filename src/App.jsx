import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./components/navbar";
import Product from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/footer";
import Banner from "./components/Banner";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}> 
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Banner />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Product />} />
              <Route path="/product-details/:id" element={<ProductDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
