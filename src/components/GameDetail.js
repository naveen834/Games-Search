import React from 'react';
//Styling and Animation
import styled from 'styled-components';
import { motion } from 'framer-motion';
//Redux
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { smallImage } from '../util';
//IMAGES
import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
//Star Images
import starEmpty from '../img/star-empty.png';
import starFull from '../img/star-full.png';
const GameDetail = ({ pathId }) => {
  const history = useHistory();

  //Exit Detail
  const exitDetailHander = (e) => {
    const element = e.target;
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto';
      history.push('/');
    }
  };
  //Get Stars
  const getStars = () => {
    const stars = [];
    const rating = Math.floor(game.rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt="star" key={i} src={starFull}></img>);
      } else {
        stars.push(<img alt="star" key={i} src={starEmpty}></img>);
      }
    }
    return stars;
  };

  //GET PLATFORM IMAGES
  const getPlatform = (platform) => {
    switch (platform) {
      case 'PlayStation 4':
        return playstation;
      case 'Xbox One':
        return xbox;
      case 'PC':
        return steam;
      case 'Nintendo Switch':
        return nintendo;
      case 'iOS':
        return apple;
      default:
        return gamepad;
    }
  };

  //Data
  const { screen, game, isLoading } = useSelector((state) => state.detail);
  return (
    <>
      {isLoading ? (
        <Loading>loading...</Loading>
      ) : (
        <CardShadow className="shadow" onClick={exitDetailHander}>
          <Detail layoutId={pathId}>
            <Stats>
              <div className="rating">
                <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                <p>Rating: {game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforms</h3>
                <Platforms>
                  {game.platforms.map((data) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                loading="lazy"
                layoutId={`image ${pathId}`}
                src={smallImage(game.background_image, 640)}
                alt={game.background_image}
              />
            </Media>
            <Description>
              <p>{game.description_raw}</p>
            </Description>
            <div className="gallery" loading="lazy">
              {screen.results.map((screen) => (
                <img
                  src={smallImage(screen.image, 640)}
                  key={screen.id}
                  alt={screen.image}
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  );
};

const Loading = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  color: white;
  font-weight: 700;
  letter-spacing: 2px;
`;
const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
  @media (max-width: 600px) {
    padding: 5px;
  }
`;

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  text-align: center;
  @media only screen and (min-width: 310px) {
    flex-direction: column;
  }
  @media only screen and (min-width: 540px) {
    flex-direction: row;
  }
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`;
const Info = styled(motion.div)`
  text-align: center;
`;
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
  @media only screen and (min-width: 320px) {
    img {
      margin-left: 1rem;
    }
  }
`;

const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`;

const Description = styled(motion.div)`
  margin: 5rem 0rem;
`;

export default GameDetail;
