// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './TamilNews.css'; // Custom CSS for Tamil News

// const TamilNews = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const apiKey = '15c09de60f5c41b1b927840500696f04'; // Replace with your API key
//   const baseUrl = `https://newsapi.org/v2/everything?q=tamil&language=ta&apiKey=${apiKey}`; // Use Tamil news endpoint

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(baseUrl);
//         if (response.data.articles && response.data.articles.length > 0) {
//           setArticles(response.data.articles);
//         } else {
//           setError('No articles available.');
//         }
//       } catch (err) {
//         setError('Failed to fetch Tamil news articles. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="tamil-news-page">
//       <h1>Tamil News</h1>
//       <div className="articles-container">
//         {articles.map((article) => (
//           <div key={article.url} className="article-card">
//             <h2>{article.title}</h2>
//             <p>{article.description}</p>
//             <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TamilNews;


import { useEffect, useState } from 'react';
import axios from 'axios';
import './TamilNews.css'; // Custom CSS for Regional News

const RegionalNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(''); // Default search query for regional news
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language (English)

  const apiKey = '15c09de60f5c41b1b927840500696f04'; // Replace with your API key

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${query || 'news'}&language=${selectedLanguage}&apiKey=${apiKey}`
        );
        if (response.data.articles && response.data.articles.length > 0) {
          setArticles(response.data.articles);
        } else {
          setError('No articles available.');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, selectedLanguage]); // Fetch news when query or language changes

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    setQuery(''); // Reset query for default results when language changes
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value.trim();
    if (searchQuery) {
      setQuery(searchQuery);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="regional-news-page">
      <h1>Regional News</h1>

      {/* Language Dropdown */}
      <select
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="language-dropdown"
      >
        <option value="hi">Hindi</option>
        <option value="ta">Tamil</option>
        <option value="bn">Bengali</option>
        <option value="ml">Malayalam</option>
        <option value="mr">Marathi</option>
        <option value="en">English</option> {/* Default language */}
      </select>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form1">
        <input
          type="text"
          name="search"
          placeholder={`Search news in ${selectedLanguage}...`}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* Articles Section */}
      <div className="articles-container1">
        {articles.map((article) => (
          <div key={article.url} className="article-card1">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="article-image1"
              />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalNews;
