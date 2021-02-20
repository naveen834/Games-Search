import axios from 'axios';

import {
  popularGamesURL,
  upcomingGamesURL,
  newGamesURL,
  searchGameURL,
} from '../api';
//Action Creator

export const loadGames = (setLoading) => async (dispatch) => {
  //FETCH AXIOS
  setLoading(true);
  const popularData = axios.get(popularGamesURL());
  const newGamesData = axios.get(newGamesURL());
  const upcomingData = axios.get(upcomingGamesURL());
  await axios.all([popularData, newGamesData, upcomingData]).then(
    axios.spread((...responses) => {
      dispatch({
        type: 'FETCH_GAMES',
        payload: {
          popular: responses[0].data.results,
          upcoming: responses[2].data.results,
          newGames: responses[1].data.results,
        },
      });
      setLoading(false);
    })
  );
};

export const fetchSearch = (game_name, isLoading) => async (dispatch) => {
  isLoading(true);
  const searchGames = axios.get(searchGameURL(game_name));
  await axios.all([searchGames]).then(
    axios.spread((...responses) => {
      dispatch({
        type: 'FETCH_SEARCHED',
        payload: {
          searched: responses[0].data.results,
        },
      });
      isLoading(false);
    })
  );
};
