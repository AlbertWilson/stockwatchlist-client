import axios from 'axios';
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from './components/signin';
import SignUp from './components/signup';
import WatchlistPage from './components/stockwatchlistpage';
import { useHistory } from 'react-router-dom';

axios.defaults.baseURL=process.env.REACT_APP_WEB_SERVER;

function App() {

  const history = useHistory();
  const [firstName, setFirstName] = React.useState("");

  React.useEffect(() => {
    axios.post("/isUserAuth", {},
    {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(async (resp:any) => {
      console.log(resp);
      
      return resp.data.isLoggedIn ? history.push("/watchlist"): null;
    });
  }, []);

  async function logOut(){
    localStorage.removeItem("firstname");
    localStorage.removeItem("token");
    await history.push("/");
  }

  async function logIn(){
    await history.push("/watchlist");
  }

  return (
      <div className="App">
        {/* Can add a navbar here if I want */}
        <Switch>
          <Route exact path="/">
            <SignIn logIn={logIn}/>
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/watchlist">
            <WatchlistPage logOut={logOut} firstName={firstName}/>
          </Route>
        </Switch>
      </div>
  );
}

export default App;
