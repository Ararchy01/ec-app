import React from 'react';

const ImagePreview = (props) => {
  return (
    <div className="p-media__thumb" onClick={() => props.remove(props.id)}>
      <img src={props.path} alt="preview_image"/>
    </div>
  )
}

export default ImagePreview;