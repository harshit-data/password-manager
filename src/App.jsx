import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-[98.5vw]">
      <Navbar />
      <div className="min-h-[100vh] bg-green-50">
        <Manager />
      </div>
      <Footer />
    </div>
  );
}

export default App;
