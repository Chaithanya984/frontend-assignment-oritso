import { Route, Switch } from "react-router-dom";
import Mainhome from "./Components/Mainhome";
import Loginform from "./Components/Loginform";
import Signupform from "./Components/Signupform";
import Tasks from "./Components/Tasks";
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => (
  <Switch>
    <Route exact path="/" component={Mainhome} />
    <Route exact path="/login" component={Loginform} />
    <Route exact path="/signup" component={Signupform} />
    <ProtectedRoute exact path="/tasks" component={Tasks} />
  </Switch>
);

export default App;
