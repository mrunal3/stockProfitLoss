import React from "react";
import "./App.css";
import { useState } from "react";
import background from "./images/background.jpg";
import bull from "./images/bull.png";
import bear from "./images/bear.png";

export default function App() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [stockQty, setStockQty] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [output, setOutput] = useState("");
  const [image, setImage] = useState("");

  const calculate = () => {
    let n_purchasePrice = Number(purchasePrice);
    let n_stockQty = Number(stockQty);
    let n_currentPrice = Number(currentPrice);

    if (n_purchasePrice > n_currentPrice) {
      let loss = (n_purchasePrice - n_currentPrice) * n_stockQty;
      let lossPercentage = (loss / n_purchasePrice) * 100;
      setOutput(
        `Bear is Active!!!, the loss is ${loss} and the percent is ${lossPercentage}%`
      );
      setImage(bear);
    } else if (n_currentPrice > n_purchasePrice) {
      let profit = (n_currentPrice - n_purchasePrice) * n_stockQty;
      let profitPercentage = (profit / n_purchasePrice) * 100;
      setOutput(
        `Market is Bullish!!!, the profit is ${profit} and the percent is ${profitPercentage}%`
      );
      setImage(bull);
    } else {
      setOutput(`No pain no gain and no gain no pain`);
      setImage("");
    }
  };

  return (
    <>
      <div className="image-container">
        <img className="image" src={background} alt="" />
      </div>
      <div className="container">
        <h1 className="heading">Stock Profit & Loss Calculator</h1>

        <div className="input_container">
          <label className="input-label" htmlFor="purchase-amount">
            Purchase Price:
          </label>
          <input
            className="input"
            min="0"
            id="purchase-amount"
            type="number"
            value={purchasePrice || ""}
            onChange={(e) => {
              setPurchasePrice(e.target.value);
            }}
          />
          <p
            className={
              purchasePrice === "" || purchasePrice > 0 ? "hide" : "error"
            }
          >
            Invalid Purchase Amount
          </p>

          <label className="input-label" htmlFor="stock-quantity">
            Stock Quantity:
          </label>
          <input
            className="input"
            id="stock-quantity"
            min="1"
            type="number"
            value={stockQty || ""}
            disabled={purchasePrice && purchasePrice > 0 ? false : true}
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setStockQty(e.target.value);
            }}
          />
          <p className={stockQty === "" || stockQty > 0 ? "hide" : "error"}>
            Invalid Stock Quantity
          </p>

          <label className="input-label" htmlFor="stock-quantity">
            Current Price:
          </label>
          <input
            className="input"
            id="stock-quantity"
            type="number"
            value={currentPrice || ""}
            disabled={
              purchasePrice && purchasePrice > 0 && stockQty && stockQty > 0
                ? false
                : true
            }
            style={{ marginBottom: "10px" }}
            onChange={(e) => {
              setCurrentPrice(e.target.value);
            }}
          />
          <p
            className={
              currentPrice === "" || currentPrice > 0 ? "hide" : "error"
            }
          >
            Invalid Current Price
          </p>
        </div>
        <button
          id="check-button"
          className={
            purchasePrice > 0 && stockQty > 0 && currentPrice !== ""
              ? "enabled"
              : "disabled"
          }
          disabled={purchasePrice > 0 && stockQty > 0 ? false : true}
          onClick={() => {
            calculate();
          }}
        >
          Check
        </button>
        <div className="profite_loss">
          <div className="output">{output}</div>
          <img src={image} alt="" height="72" />
        </div>
      </div>
    </>
  );
}
