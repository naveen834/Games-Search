import axios from 'axios';
import { gameDetailsURL, gameScreenshotURL } from '../api';

export const loadDetail = (id) => async (dispatch) => {
  dispatch({
    type: 'LOADING_DETAIL',
  });

  const detailData = axios.get(gameDetailsURL(id));
  const screenShotData = axios.get(gameScreenshotURL(id));
  await axios.all([detailData, screenShotData]).then(
    axios.spread((...responses) => {
      dispatch({
        type: 'GET_DETAIL',
        payload: {
          game: responses[0].data,
          screen: responses[1].data,
        },
      });
    })
  );
};
