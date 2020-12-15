import "./InputValue.css";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";


const InputValue = ({
  currency,
  setCurrency,
  availabeCurrencies,
  setCurrencyToConvert,
  currencyToConvert,
  value,
  setValue,
}) => {
  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handleChangeCurrencyToConvert = (event) => {
    setCurrencyToConvert(event.target.value);
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  const createMenuItem = availabeCurrencies.map((currency, index) => (
    <MenuItem key={index} value={currency}>
      {currency}
    </MenuItem>
  ));

  const handleReplaceCurrecies = () =>{
    const firstCurrency = currency
    const secondCurrency = currencyToConvert
    if(currencyToConvert !== firstCurrency){
      setCurrencyToConvert(firstCurrency)
    }
    if(currency !== secondCurrency){
      setCurrency(secondCurrency)
    }
  }

  return (
    <div className="inputValue">
      <TextField
        id="standard-basic"
        label="Enter value"
        value={value}
        onChange={handleChangeValue}
        autoComplete='off'
      />
      <div className="chooseCurrency">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          onChange={handleChangeCurrency}
        >
          {createMenuItem}
        </Select>
        <ArrowForwardIcon style={{cursor: "pointer"}} onClick={handleReplaceCurrecies} />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currencyToConvert}
          onChange={handleChangeCurrencyToConvert}
        >
          {createMenuItem}
        </Select>
      </div>
    </div>
  );
};

export default InputValue;
