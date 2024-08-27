import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading, { useLoading } from "./components/Loading";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useFetchUser } from "./hooks";

const App = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const userFinish = useFetchUser(isAuthReady);
  const { setLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      setIsAuthReady(true);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(!userFinish); 
  }, [userFinish])

  if (!userFinish) {
    return <Loading/>;
  }

  return (
    <div>
      <RouterProvider router={router}/>
      <Loading/>
    </div>
  );
};

export default App;
