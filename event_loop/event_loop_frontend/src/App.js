import React from "react";
import styles from './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import EventsMap from './EventsMap';
import EventsList from './EventsList';
import Pagination from './Pagination';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/events/:id" component={Event} />
      </div>
    </Router>
  );
}

function Event({ match }) {
  return (
    <div>
      <h3>Event: {match.params.id}</h3>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Home({ match }) {
  return (
    <div>
      <h2>Events</h2>
      <ul>
        <li>
          <Link to={`events/1`}>Event #1</Link>
        </li>
      </ul>
      <EventsList />
      <Pagination />
      <EventsMap />

      <Route
        exact
        path={match.path}
        render={() => <h3>Please select an event.</h3>}
      />
    </div>
  );
}

export default App;
