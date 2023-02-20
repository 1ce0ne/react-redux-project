import './App.css';
import {useDispatch, useSelector} from "react-redux";
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';
import { fetchCustomers } from './asyncActions/customers';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash);
  const customers = useSelector(state => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash))
  }

  const getCash = (cash) => {
    dispatch(getCashAction(cash))
  }

  const addCustomer = (name) => {
    const customer = {
      name: name, 
      id: Date.now(), 
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div style={{fontSize:"3rem", marginBottom: 10}}>Баланс: {cash}</div>
      <div style={{display:"block", marginLeft:"auto", marginRight:"auto"}}>
        <button onClick={() => addCash(Number(prompt()))}>Пополнить счёт</button>
        <button onClick={() => getCash(Number(prompt()))}>Снять счёт</button>
        <button onClick={() => addCustomer(prompt())}>Добавить клиента</button>
        <button onClick={() => dispatch(fetchCustomers())}>Получить клиентов из базы</button>
      </div>
      {customers.length > 0 ?
        <div> 
          {customers.map(customer => 
            <div onClick={() => removeCustomer(customer)} style={{fontSize: "2rem", padding: 10, marginTop: 5}}> 
              {customer.name}
            </div>
          )}
        </div>
        :
        <div style={{fontSize:"2rem"}}>
          Клиенты отсутствуют!
        </div>
      }
       
    </div>
  );
}

export default App;
