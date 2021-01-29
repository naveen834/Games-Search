//MEdia resize

export const smallImage = (imagePath, size) => {
  if(imagePath === null){
    return 'https://media.rawg.io/media/resize/640/-/games/490/49016e06ae2103881ff6373248843069.jpg';
  }
  const image = imagePath.match(/media\/screenshots/)
    ? imagePath.replace(
        "media/screenshots",
        `media/resize/${size}/-/screenshots`
      )
    : imagePath.replace("/media/games/", `/media/resize/${size}/-/games/`);
  return image;
};
