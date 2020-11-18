import * as React from "react";
import "./styles.css";
import UserView from "./UserView";

const users = ["User 1", "User 2", "User 3", "User 4"];

const initialQuantity = 5;

export default function App() {
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const [semaphore, setSemaphore] = React.useState(initialQuantity);
  const aquireLock = () => {
    if (semaphore === 0) return false;
    setSemaphore((sem) => sem - 1);
    return true;
  };

  const releaseLock = () => {
    setSemaphore((sem) => sem + 1);
  };

  const doActualOrder = (callback: () => void) => {
    if (quantity === 0) return;
    setTimeout(() => {
      setQuantity((q) => q - 1);
      callback();
    }, 5000);
  };

  const order = () => {
    if (!aquireLock()) return;
    doActualOrder(releaseLock);
  };

  const reset = () => {
    setQuantity(initialQuantity);
    setSemaphore(initialQuantity);
  };

  return (
    <div className="App">
      <h1>Counting semaphore Example</h1>
      <h2>We have N number of product and N number of users trying to order</h2>
      <h3>Placed Locks: {initialQuantity - semaphore}</h3>
      <h3>Available Locks: {semaphore}</h3>
      <div className="row">
        {users.map((user, i) => (
          <UserView key={i} user={user} quantity={quantity} order={order} />
        ))}
      </div>

      <button onClick={reset}>Reset the system</button>
    </div>
  );
}
