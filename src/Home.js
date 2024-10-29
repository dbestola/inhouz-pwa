import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="home container">
        <header className="home-header">
          <h1>Welcome to Inhouz News</h1>
          <p>
            Get the latest news on technology, science, and more, in a sleek
            dark mode interface!
          </p>
        </header>
        <section className="home-articles">
          <h2>Latest Articles</h2>
          <ul>
            <li>
              <Link to="/articles/1">
                Understanding Server-Side Rendering with Razzle
              </Link>
            </li>
            <li>
              <Link to="/articles/2">
                Building Responsive Web Apps with React and CSS
              </Link>
            </li>
            <li>
              <Link to="/articles/3">Exploring Dark Mode UI Trends</Link>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

export default Home;
