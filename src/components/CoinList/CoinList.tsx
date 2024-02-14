import { Link } from "react-router-dom";
import CoinListItem from "../CoinListItem/CoinListItem";
import CoinDetails from "../CoinDetails/CoinDetails";
import "./CoinList.css";

const CoinList = ({ coinListApiData }: any) => {
  return (
    <div className="container">
      <div>
        <div className="heading">
          <p>#</p>
          <p className="coin_name">Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className="hide_mobile">Volume</p>
          <p className="hide_mobile">MKT Cap</p>
        </div>

        {coinListApiData ? (
          coinListApiData.map((item: any) => (
            <Link
              to={`/crypto-info-api/coin/${item.id}`}
              key={item.id}
              element={<CoinDetails />}
            >
              <CoinListItem coinItemData={item} key={item.id} />
            </Link>
          ))
        ) : (
          <h1 className="server_error">
            Ther is Problem with the Server - Please Try Later!
          </h1>
        )}
      </div>
    </div>
  );
};

export default CoinList;
