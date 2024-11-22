import { useEffect, useState } from "react";
import { Users } from "./components/users";

function App() {
  const isServer = typeof window === "undefined";
  const [route, setRoute] = useState(isServer ? "/" : window.location.pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);

    setRoute(window.location.pathname);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  const renderRoute = () => {
    switch (route) {
      case "/":
        return <Users navigate={navigate} />;
      case "/users":
        return <Users navigate={navigate} />;
      case "/users/create":
        return <div>create user</div>;
      //   return <CreateUser navigate={navigate} />;
      default:
        return <Users navigate={navigate} />;
    }
  };

  return <div>{renderRoute()}</div>;
}

export default App;
