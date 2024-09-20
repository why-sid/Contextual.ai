// Example API keys (replace with your actual keys)
const NEWS_API_KEY = '69ee2571a70b4a1e950e9dfd71d4b6b0';
const DEVTO_API_URL = 'https://dev.to/api/articles'; // Dev.to API endpoint

let blogPage = 1;
let newsPage = 1;
let tickerPage = 1; // New page counter for ticker
const pageSize = 10;

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();
    fetchNews();
    fetchTickerNews(); // Fetch ticker news on page load

    document.getElementById('load-more-blogs').addEventListener('click', () => {
        blogPage++;
        fetchBlogs(true); // Pass true to refresh the list
    });

    document.getElementById('load-more-news').addEventListener('click', () => {
        newsPage++;
        fetchNews(true); // Pass true to refresh the list
    });
});

function fetchBlogs(refresh = false) {
    fetch(`${DEVTO_API_URL}?page=${blogPage}&per_page=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            const blogList = document.getElementById('blog-list');
            if (refresh) {
                blogList.innerHTML = ''; // Clear existing content
            }
            blogList.innerHTML = data.map(blog => `
                <article class="blog-post">
                    <h3>${blog.title}</h3>
                    <p>${blog.description || blog.body_plain.substring(0, 150)}...</p>
                    <a href="${blog.url}" class="read-more">Read more</a>
                </article>
            `).join('');
        })
        .catch(error => console.error('Error fetching blogs:', error));
}
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const NEWS_API_URL = `${CORS_PROXY}https://newsapi.org/v2/top-headlines?country=us&page=${newsPage}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;

function fetchNews(refresh = false) {
    fetch(NEWS_API_URL)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news-list');
            if (refresh) {
                newsList.innerHTML = ''; // Clear existing content
            }
            newsList.innerHTML = data.articles.map(article => `
                <article class="news-article">
                    <h3>${article.title}</h3>
                    <p>${article.description}</p>
                    <a href="${article.url}" class="read-more">Read more</a>
                </article>
            `).join('');
        })
        .catch(error => console.error('Error fetching news:', error));
}


const GNEWS_API_KEY = '351d558dbe62d2b11007cd0063a73ceb'; 
const GNEWS_API_URL = 'https://gnews.io/api/v4/top-headlines';

function fetchTickerNews() {
    fetch(`${GNEWS_API_URL}?lang=en&country=us&max=5&apikey=${GNEWS_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const tickerContent = document.getElementById('ticker-content');
            const headlines = data.articles.map(article => `<span>${article.title}</span>`).join(' | ');
            tickerContent.innerHTML = headlines;
        })
        .catch(error => console.error('Error fetching ticker news:', error));
}

// Fetch ticker news on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchTickerNews();
});

