# **InvestAnalytics**

# **How to get started**
 - Add your ALPHA_VANTAGE_API_KEY via -> export ALPHA_VANTAGE_API_KEY=YOUR_API_KEY OR use set ALPHA_VANTAGE_API_KEY=YOUR_API_KEY
 - Now start the backend server by doing python news_api.py
 - Now we can start the front end by navigating to the webapp folder and doing "**npm run dev**".
 - Now you should be set.

# **Watchlist Details**
 - Articles currently cached every 24 hours in cached_articles json file.
 - News grabs from Alpha Vantage Api so you will need a key to start the backend server.

## Site Structure

```mermaid
graph TD;
    HomePage-->About-->A["What is InvestAnalytics"];
    HomePage-->Watchlist-->B["Pick your favorite stocks/crypto to watch"];
    HomePage-->Recent News-->C["Look at recent news articles catered to your watchlist"];
