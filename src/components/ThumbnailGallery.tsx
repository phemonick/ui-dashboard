import React from "react";
import styled from "styled-components";

interface ThumbnailGalleryProps {
  images: string[];
}

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Thumbnail = styled.div<{ bg: string }>`
  width: 29px;
  height: 52px;
  border-radius: 3px;
  background: url(${(props) => props.bg}) center/cover no-repeat;
  overflow: hidden;
`;

const MoreImagesOverlay = styled.div`
  width: 29px;
  height: 52px;
  border-radius: 3px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;

export const ThumbnailGallery: React.FC<ThumbnailGalleryProps> = ({ images }) => {
  const maxThumbnails = 6;
  const extraImages = images.length > maxThumbnails ? images.length - maxThumbnails : 0;
  const visibleImages = images.slice(0, maxThumbnails - (extraImages > 0 ? 1 : 0));

  return (
    <ThumbnailContainer>
      {visibleImages.map((image, index) => (
        <Thumbnail key={index} bg={image} />
      ))}
      {extraImages > 0 && <MoreImagesOverlay>+{extraImages}</MoreImagesOverlay>}
    </ThumbnailContainer>
  );
};
