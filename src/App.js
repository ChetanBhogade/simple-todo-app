import Dashboard from "./Components/Dashboard";
import { createContext, useState } from "react";
import BackdropLoader from "./Components/BackdropLoader";

export const loaderContext = createContext();

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <loaderContext.Provider value={{ loading, setLoading }}>
        <Dashboard />
      </loaderContext.Provider>
      <BackdropLoader loading={loading} />
    </div>
  );
}

export default App;
