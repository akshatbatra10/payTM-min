import { useState } from "react";
import { Appbar } from "./Appbar";
import { Balance } from "./Balance";
import { UserList } from "./UserList";

export const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  return (
    <>
      <Appbar />
      <Balance balance={balance} setBalance={setBalance} />
      <UserList setBalance={setBalance} />
    </>
  );
};
