import "./App.css";

import { UserFavsProvider } from "./context/userFavsContextProvider";
import Main from "./components/main";

function App() {
  return (
    <UserFavsProvider>
      <Main />
    </UserFavsProvider>
  );
}

export default App;
