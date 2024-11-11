import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general'); // Default category

  const apiKey = '2c93a9a0a64a45df88de5518f1683cc3'; // Your API key
  const baseUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&apiKey=${apiKey}`;

  // Fetch articles when the component is mounted or category changes
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(baseUrl);
        if (response.data.articles && response.data.articles.length > 0) {
          setArticles(response.data.articles);
        } else {
          setError('No articles available.');
        }
      } catch (err) {
        setError('Failed to fetch news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '1.2em' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#333' }}>Latest News</h1>
        
        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{
            padding: '10px',
            fontSize: '1em',
            borderRadius: '5px',
            marginBottom: '20px',
            width: '200px',
          }}
        >
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="business">Business</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="technology">Technology</option>
          <option value="politics">Politics</option>
        </select>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
      </header>

      {/* Articles Display */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}>
        {filteredArticles.map((article) => (
          <div key={article.url} style={{
            backgroundColor: '#f8f8f8',
            width: '300px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
          }}>
            <img
              src={article.urlToImage || 'https://via.placeholder.com/300x200'}
              alt={article.title || 'No Title Available'}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '15px' }}>
              <h2 style={{
                fontSize: '1.2em',
                color: '#333',
                marginBottom: '10px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>
                {article.title || 'No Title Available'}
              </h2>
              <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '10px' }}>
                Published: {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })} at {new Date(article.publishedAt).toLocaleTimeString()}
              </p>
              <p style={{ fontSize: '0.9em', color: '#777', marginBottom: '15px' }}>
                {article.description || 'No description available.'}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
