import "./CoinListItem.css";

const CoinListItem = ({ coinItemData }: any) => {
  return (
    <div className="coin_row">
      <div className="img_symbol">
        <p className="coin_index">{coinItemData.market_cap_rank}</p>
        <img src={coinItemData.image} alt="img" />
        <p>{coinItemData.symbol.toUpperCase()}</p>
      </div>

      <p>${coinItemData.current_price.toLocaleString()}</p>
      <p>{coinItemData.price_change_percentage_24h.toFixed(2)}%</p>

      <p className="hide_mobile">
        {coinItemData.total_volume.toLocaleString()}
      </p>
      <p className="hide_mobile">{coinItemData.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinListItem;
