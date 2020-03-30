import React from 'react';
import axios, { AxiosResponse } from "axios";
import logo from './logo.svg';
import './App.css';

function getApiCount(): Promise<number> {
  return axios.get(process.env.REACT_APP_API_BASE_URL + "/", {  }).then((res: AxiosResponse) => res.data.count);
}

function App() {
  const [ count, setCount ] = React.useState(0)

  React.useEffect(() => {
    getApiCount().then((count: number) => {
      setCount(count);
    });
  }, [ setCount ]);

  const incrementCallsCountByApiCall = React.useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    getApiCount().then((count: number) => {
      setCount(count);
    });
  }, [setCount]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Click on this button to call the api (http://localhost:8080)
        </p>
        <p>
          The current api count is {count}
        </p>
        <button onClick={incrementCallsCountByApiCall}>
          Increment the call count
        </button>
      </header>
    </div>
  );
}

export default App;
