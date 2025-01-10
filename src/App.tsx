import "./App.css";
import MainLayout from "./Components/Layout/MainLayout";
import PrivateRoute from "./Components/Layout/PrivateRoute";

function App() {
  return (
    <PrivateRoute>
      <MainLayout />
    </PrivateRoute>
  );
}

export default App;
