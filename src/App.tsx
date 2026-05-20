import { Toaster } from "react-hot-toast";
import Employees from "./pages/Employees";

const App = () => {
  return (
    <>
      <Employees />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#f8fafc",
            border: "1px solid #334155",
          },
        }}
      />
    </>
  );
};

export default App;