import { FaCoins } from "react-icons/fa";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CoinList from "./components/CoinList/CoinList";
import CoinDetails from "./components/CoinDetails/CoinDetails";

function App() {
  const [coinListData, setCoinListData] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false&locale=en";

  const gettingCoinListApiData = async () => {
    const responseData = await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => console.log(error));

    console.log(responseData);
    setCoinListData(responseData);
  };

  useEffect(() => {
    gettingCoinListApiData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Link to="/crypto-info-api/">
          <div className="navbar">
            <FaCoins className="icon" />
            <h1>
              Coin <span className="purple">Search</span>
            </h1>
          </div>
        </Link>

        <Routes>
          <Route
            path="/crypto-info-api/"
            element={<CoinList coinListApiData={coinListData} />}
          />

          <Route path="/crypto-info-api/coin/" element={<CoinDetails />}>
            <Route path=":coinId" element={<CoinDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
