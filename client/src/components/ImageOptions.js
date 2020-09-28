import PropTypes from 'prop-types';
import React from 'react';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const propTypes = {
  customs: PropTypes.object.isRequired,
  urlPrompt: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

const ImageOptions = ({ customs, urlPrompt, handleUpdate }) => {
  const imageData = ["https://res.cloudinary.com/momentumclone/image/upload/v1528705942/hvlvljdof85nvnhbusvl.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1528705972/fxqwm6ecdumqvc0rdnla.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1528706033/l8d1gyvul1npcgmbfccg.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1528706089/sc4fjobgtrlireqv9xs1.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1529926901/bg2_hnpp9c.jpg"
    , "https://res.cloudinary.com/momentumclone/image/upload/v1529926358/bg6_ctsgyu.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1529932216/blue_obq29x.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847412/sky.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847413/bg4.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847413/trees.jpg"
    , "https://res.cloudinary.com/momentumclone/image/upload/v1530847413/bluesky.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847413/road.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847413/bg3.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847412/cherry_blossom.jpg", "https://res.cloudinary.com/momentumclone/image/upload/v1530847412/wallp3.jpg"];
  return (
    <div>
      <div className="options">
        Background Image
        <div className="float-right">
          <ButtonGroup>
            <Button onClick={ () => {
              var url = urlPrompt();
              document.body.style.backgroundImage = `url(${ url })`;
              handleUpdate(customs, "backgroundImage", url);
            } }>image from url</Button>
            <Button onClick={ () => {
              document.body.style.background = "none";
              handleUpdate(customs, "backgroundImage", "none");
            } }>set no image</Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="image-picker">
        { imageData.map((item) =>
          <div key={ item } className="thumbnail-container margin-picker">
            <img className="thumbnail" src={ item } alt="pic" onClick={ () => {
              document.body.style.backgroundImage = `url(${ item })`;
              handleUpdate(customs, "backgroundImage", item);
            } } />
          </div>) }
      </div>
    </div>
  );
}

ImageOptions.propTypes = propTypes;
export default ImageOptions;