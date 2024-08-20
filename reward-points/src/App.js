import logo from './logo.svg';
import './App.css';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
//import './style.css';
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import { TransactionList } from './transactionList';


function App() {
  return (
    <div className="App">
      <TransactionList/>
    </div>
  );
}

export default App;
