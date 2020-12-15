import { useEffect, useState } from "react";
import "./App.css";
import InputValue from "./comp/InputValue";
import Results from "./comp/Results";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [currency, setCurrency] = useState("");
  const [data, setData] = useState("");
  const [availabeCurrencies, setAvailabeCurrencies] = useState([]);
  const APILink = `https://api.exchangeratesapi.io/latest?base=${currency}`;
  const [value, setValue] = useState("");

  const [currencyToConvert, setCurrencyToConvert] = useState("PLN");

  const currencySigns = [
    {
      sign: '$',
      currency: "USD"
    },
    {
      sign: '€',
      currency: "EUR"
    },
    {
      sign: '£',
      currency: "GBP"
    },
    {
      sign: 'kn',
      currency: "HRK"
    },
    {
      sign: 'kr',
      currency: "NOK"
    },
    {
      sign: 'zł',
      currency: "PLN"
    },
    {
      sign: 'zl',
      currency: "PLN"
    },
    {
      sign: '₽',
      currency: "RUB"
    },
    {
      sign: 'lei',
      currency: "RON"
    },
    {
      sign: '₺',
      currency: "TRY"
    },
    {
      sign: 'R$',
      currency: "BRL"
    },
    {
      sign: '¥',
      currency: "CNY"
    },


  ]

  useEffect(() => {
    fetch(APILink)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setAvailabeCurrencies([]);
        for (const currency in res.rates) {
          setAvailabeCurrencies((prev) => [...prev, currency]); // FETCH ALL AVAILABLE CURRENCIES
        }
        setAvailabeCurrencies((prev) => [...prev, res.base].sort()); // ADD DEFAULT CURRENCY
        setCurrency(res.base);
      });
  }, [APILink, currency]);

  if (value.length > 0) {
    //   EASY INSERT YOUR CURRENCY IN INPUT ('USD', 'EUR' AND MORE)
    availabeCurrencies.forEach((item) => {
      if (value.indexOf(item) > 0) {
        let newValue = value.slice(0, value.indexOf(item));
        setValue(newValue);
        setCurrency(item);
      }
      if (value.indexOf(item.toLowerCase()) > 0) {
        let newValue = value.slice(0, value.indexOf(item.toLowerCase()));
        setValue(newValue);
        setCurrency(item);
      }
    });
  };
  
  if(value.length > 0){
    // EASY INSERT SIGN OF CURRENCY ($,€,¥)
    currencySigns.forEach(item=> {
      if (value.includes(item.sign)) {
        let newValue = value.slice(0, value.indexOf(item.sign));
        if(item.sign.length === 1){
          newValue += value.slice(value.indexOf(item.sign)+1)
        }else{
          newValue += value.slice(value.indexOf(item.sign)+2)
        }
        setValue(newValue);
        setCurrency(item.currency);
      }
    })
  }

  if (value.includes(",")) {
    let index = value.indexOf(",");
    let el = value.slice(0, index);
    el += ".";
    el += value.slice(index + 1);
    setValue(el);
  }

  return (
    <>
      <h1 className="title">Currency Converter</h1>
      {data.date ? (
        <div className="app">
          <InputValue
            currency={currency}
            setCurrency={setCurrency}
            currencyToConvert={currencyToConvert}
            setCurrencyToConvert={setCurrencyToConvert}
            availabeCurrencies={availabeCurrencies}
            value={value}
            setValue={setValue}
          />
          <Results
            data={data}
            currency={currency}
            currencyToConvert={currencyToConvert}
            value={value}
          />
        </div>
      ) : (
        <div className="app">
          <CircularProgress />
        </div>
      )}
    </>
  );
}

export default App;
