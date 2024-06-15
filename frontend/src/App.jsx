import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newAds, setnewAds] = useState(0);

  useEffect(() => {
    const fetchMovies = () => {
      fetch("http://localhost:8080/api/new-ads", {
        method: "GET",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          setnewAds(data);
          console.log(data);
        })
        .catch((error) => console.error("Error fetching new ads:", error));
    };

    const delayFetch = setTimeout(() => {
      fetchMovies();
      const intervalId = setInterval(fetchMovies, 1800000);
      return () => clearInterval(intervalId);
    }, 1800000);

    return () => clearTimeout(delayFetch);
  }, []);

  return (
    <div className="container">
      <div className="second">
        <div className="third">
          <div className="img-container">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCv20AokroA2h7YdL0Yo4Csaoc7QSYAhEIWg&s"
              alt="OLX"
            />
          </div>
          <div className="content">
            <h1>Here are the number of new ads (women cloth) from OLX!</h1>
            <p>Updating every 30 minutes</p>
          </div>
        </div>
        <h1>New Ads: {newAds.newAds}</h1>
      </div>
    </div>
  );
}

export default App;
