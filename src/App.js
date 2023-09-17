import Home from './Pages/Home';
import { useState } from 'react';
import CountryDetail from './Pages/CountryDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path='/:countryCode' element={<CountryDetail isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
          <Route path='*' element={<h2>404 Page not found</h2>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
