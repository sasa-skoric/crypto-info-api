import DOMPurify from "isomorphic-dompurify";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CoinDetails.css";

const CoinDetails = () => {
  const dynamicUrl = useParams();

  const [coinDescription, setCoinDescription] = useState<any>({});

  const url = `https://api.coingecko.com/api/v3/coins/${dynamicUrl.coinId}`;

  const getCoinDescriptionData = async () => {
    const responseData = await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });

    console.log(responseData);
    setCoinDescription(responseData);
    console.log(coinDescription);
  };

  useEffect(() => {
    getCoinDescriptionData();
  }, []);

  return (
    <div>
      <div className="coin_container">
        <div className="content">
          <h1>{coinDescription.name}</h1>
        </div>

        <div className="content">
          <div className="rank">
            <span className="rank_btn">
              Rank #{coinDescription.market_cap_rank}
            </span>
          </div>

          <div className="info">
            <div className="coin_heading">
              {coinDescription.image ? (
                <img src={coinDescription.image.small} alt="img" />
              ) : null}
              <p className="small_name">{coinDescription.name}</p>
              <p>
                {coinDescription.symbol
                  ? coinDescription.symbol.toUpperCase()
                  : null}
              </p>
            </div>

            <div className="coin_price">
              {coinDescription.market_data?.current_price ? (
                <h1>
                  $
                  {coinDescription.market_data.current_price.usd.toLocaleString()}
                </h1>
              ) : null}
            </div>
          </div>
        </div>

        <div className="content">
          <table>
            <thead>
              <tr>
                <th>1H</th>
                <th>24H</th>
                <th>7D</th>
                <th>14D</th>
                <th>30D</th>
                <th className="mobile_hidden">1Yr</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  {coinDescription.market_data
                    ?.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coinDescription.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        2
                      )}
                      %
                    </p>
                  ) : null}
                </td>

                <td>
                  {coinDescription.market_data
                    ?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coinDescription.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        2
                      )}
                      %
                    </p>
                  ) : null}
                </td>

                <td>
                  {coinDescription.market_data
                    ?.price_change_percentage_7d_in_currency ? (
                    <p>
                      {coinDescription.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        2
                      )}
                      %
                    </p>
                  ) : null}
                </td>

                <td>
                  {coinDescription.market_data
                    ?.price_change_percentage_14d_in_currency ? (
                    <p>
                      {coinDescription.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        2
                      )}{" "}
                      %
                    </p>
                  ) : null}
                </td>

                <td>
                  {coinDescription.market_data
                    ?.price_change_percentage_30d_in_currency ? (
                    <p>
                      {coinDescription.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        2
                      )}
                      %
                    </p>
                  ) : null}
                </td>

                <td className="mobile_hidden">
                  {coinDescription.market_data
                    ?.price_change_percentage_1y_in_currency ? (
                    <p>
                      {coinDescription.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        2
                      )}
                      %
                    </p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="content">
          <div className="stats">
            <div className="left">
              <div className="row">
                <h4>24 Hour Low</h4>
                {coinDescription.market_data?.low_24h ? (
                  <p>
                    $ {coinDescription.market_data.low_24h.usd.toLocaleString()}{" "}
                  </p>
                ) : null}
              </div>

              <div className="row">
                <h4>24 Hour High</h4>
                {coinDescription.market_data?.high_24h ? (
                  <p>
                    ${" "}
                    {coinDescription.market_data.high_24h.usd.toLocaleString()}{" "}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="right">
              <div className="row">
                <h4>Market Cap</h4>
                {coinDescription.market_data?.market_cap ? (
                  <p>
                    ${" "}
                    {coinDescription.market_data.market_cap.usd.toLocaleString()}
                  </p>
                ) : null}
              </div>

              <div className="row">
                <h4>Circulating Supply</h4>
                {coinDescription.market_data?.circulating_supply ? (
                  <p>
                    ${" "}
                    {coinDescription.market_data.circulating_supply.toLocaleString()}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coinDescription.description
                    ? coinDescription.description.en
                    : ""
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
