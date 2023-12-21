// API is available at import.meta.env.VITE_API_URL

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputURL, setInputURL] = useState("");
  const [shortenedURL, setShortenedURL] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputURL(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "shorten",
        {
          originalURL: inputURL,
        }
      );

      setShortenedURL(response.data.shortUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputURL}
          onChange={handleChange}
          placeholder="Enter URL"
        />
        <button type="submit">Shorten URL</button>
      </form>
      {shortenedURL && (
        <div>
          <p>Shortened URL:</p>
          <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
            {shortenedURL}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
