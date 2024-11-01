import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const tableHead = ["Currency", "We Buy", "Exchange Rate", "We Sell"];

  const countBuy = (rate) => {
    const rateNumber = Number(rate);
    const diff = 0.05 * rateNumber;
    const result = rateNumber + diff;

    return Number(result.toFixed(4));
  };

  const countSell = (rate) => {
    const rateNumber = Number(rate);
    const diff = 0.05 * rateNumber;
    const result = rateNumber - diff;

    return Number(result.toFixed(4));
  };

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchCurrency = async () => {
    try {
      const response = await fetch(
        `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${
          import.meta.env.VITE_API_CURRENCY
        }&symbols=CAD,EUR,IDR,JPY,CHF,GBP&base=USD`
      );

      // Memastikan respons berhasil
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching currency data:", error);
    }
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  const baseCurrency = "USD";
  const initialData = [
    {
      name: "CAD",
      weBuy: countBuy(data ? data.rates.CAD : null),
      exRate: data ? data.rates.CAD : null,
      weSell: countSell(data ? data.rates.CAD : null),
    },
    {
      name: "EUR",
      weBuy: countBuy(data ? data.rates.EUR : null),
      exRate: data ? data.rates.EUR : null,
      weSell: countSell(data ? data.rates.EUR : null),
    },
    {
      name: "IDR",
      weBuy: countBuy(data ? data.rates.IDR : null),
      exRate: data ? data.rates.IDR : null,
      weSell: countSell(data ? data.rates.IDR : null),
    },
    {
      name: "JPY",
      weBuy: countBuy(data ? data.rates.JPY : null),
      exRate: data ? data.rates.JPY : null,
      weSell: countSell(data ? data.rates.JPY : null),
    },
    {
      name: "CHF",
      weBuy: countBuy(data ? data.rates.CHF : null),
      exRate: data ? data.rates.CHF : null,
      weSell: countSell(data ? data.rates.CHF : null),
    },
    {
      name: "GBP",
      weBuy: countBuy(data ? data.rates.GBP : null),
      exRate: data ? data.rates.GBP : null,
      weSell: countSell(data ? data.rates.GBP : null),
    },
  ];

  return (
    <>
      <main>
        <section className="w-full text-center p-3">
          <h1 className="text-3xl font-bold">APPLIKASI CURRENCY CHANGE</h1>
        </section>
        <section className="flex justify-center items-center">
          <table className="table-auto">
            <thead>
              <tr>
                {tableHead.map((title, index) => {
                  return (
                    <th className="p-2 border border-slate-200" key={index}>
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {initialData.map((data, index) => {
                return (
                  <tr key={index}>
                    <th className="p-2 border border-slate-200">{data.name}</th>
                    <th className="p-2 border border-slate-200">
                      {data.weBuy}
                    </th>
                    <th className="p-2 border border-slate-200">
                      {data.exRate}
                    </th>
                    <th className="p-2 border border-slate-200">
                      {data.weSell}
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default App;
