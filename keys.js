console.log('this is loaded');
//holds spotify keys
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
  consumer_key: process.env.BandsInTown_app_KEY
}
  
//#omdb API key

//Here is your key: 7af38222

//Please append it to all of your API requests,
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=7af38222