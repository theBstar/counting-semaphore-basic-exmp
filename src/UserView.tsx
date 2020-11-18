import * as React from "react";

type Props = {
  user: string;
  quantity: number;
  order: () => void;
};

const styles: React.CSSProperties = {
  border: "solid black 2px",
  padding: "8px"
};

function UserView({ user, quantity, order }: Props) {
  return (
    <div style={styles}>
      <h3> User: {user} </h3>
      <h3> Quantity: {quantity} </h3>
      <h3> Can order: {quantity > 0 ? "Yes" : "No"} </h3>
      <button disabled={quantity === 0} onClick={order}>
        Order
      </button>
    </div>
  );
}

export default UserView;
