import { useContext } from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Layout from "./components/Layout/Layout";
import AuthPage from "./components/pages/AuthPage";
import MoviesPage from "./components/pages/MoviesPage";
import AuthContext from "./components/store/authentication-context";


function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn &&<Route path="/auth">
          <AuthPage />
        </Route>}
        {authCtx.isLoggedIn && (
          <Route path="/movies">
            <MoviesPage />
          </Route>
        )}
      <Route path='*'>
        <Redirect to='/'/>
      </Route>
      </Switch>
    </Layout>
  );
}
export default App;
