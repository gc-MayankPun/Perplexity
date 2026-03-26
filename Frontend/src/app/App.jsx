import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hook/useAuth";
import { useEffect } from "react";

const App = () => {
  const { handleGetMe } = useAuth();

  // Perform hydration (Bring data from server and save it to State from API response)
  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
