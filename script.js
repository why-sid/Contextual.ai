// Example API keys (replace with your actual keys)
const GUARDIAN_API_KEY = '0ddd8262-e88f-487c-a896-abf28adeac61';
const DEVTO_API_URL = 'https://dev.to/api/articles'; // Dev.to API endpoint

let blogPage = 1;
let newsPage = 1;
let tickerPage = 1; // New page counter for ticker
const pageSize = 10;

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();
    fetchNews(); // Fetch news from the Guardian
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

// Fetch news from the Guardian API
function fetchNews(refresh = false) {
    fetch(`https://content.guardianapis.com/search?page=${newsPage}&page-size=${pageSize}&api-key=${GUARDIAN_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const newsList = document.getElementById('news-list');
            if (refresh) {
                newsList.innerHTML = ''; // Clear existing content
            }
            newsList.innerHTML = data.response.results.map(article => `
                <article class="news-article">
                    <h3>${article.webTitle}</h3>
                    <p>Published on: ${new Date(article.webPublicationDate).toLocaleDateString()}</p>
                    <a href="${article.webUrl}" class="read-more">Read more</a>
                </article>
            `).join('');
        })
        .catch(error => console.error('Error fetching news:', error));
}

// GNews API for ticker
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
