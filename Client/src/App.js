import Navbar from "./Navbar";
import Posts from "./Posts";
import seedPosts from "./seedPosts";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./LoginForm";
import PageContent from "./PageContent";
import { ThemeProvider } from "./contexts/ThemeContext";
import SignupForm from "./SignupForm";
import useToggle from "./hooks/useToggle";
import Messenger from "./Messenger";

function App() {
  const [posts, setPosts] = useState(seedPosts);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Switch>
      <Route
        exact
        path="/posts"
        render={(routeProps) =>
          currentUser ? (
            <Posts posts={posts} {...routeProps} />
          ) : (
            <Redirect to="/login" />
          )
        }
      ></Route>
      <Route
        exact
        path="/messenger"
        render={(routeProps) =>
          currentUser ? <Messenger {...routeProps} /> : <Redirect to="/login" />
        }
      ></Route>
      <Route
        exact
        path="/login"
        render={(routeProps) => (
          <ThemeProvider>
            <PageContent>
              <LoginForm {...routeProps} />
            </PageContent>
          </ThemeProvider>
        )}
      ></Route>

      <Route
        exact
        path="/signup"
        render={(routeProps) => <SignupForm {...routeProps} />}
      ></Route>

      <Route exact path="/">
        {currentUser ? <Redirect to="/posts" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  );
}

export default App;
