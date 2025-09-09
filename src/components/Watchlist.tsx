const Watchlist = () => {
  /*
  What we effectively need to do is create some sort of authentication method and on this specific page, we need to authenticate if the user is logged in,
  and that their account is correctly identifiable in the database. Once done, we can present the user's favorited crypto/stock tickers if any at all.
  

  */
  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4 mt-14">My Watchlist</h1>
      <p>This is your watchlist page. Add your favorite stocks and cryptocurrencies here!</p>
    </div>
  );
};

export default Watchlist;
