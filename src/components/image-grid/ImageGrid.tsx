import React from "react";
import { Card } from "react-bootstrap";
import { ImageGridProps } from "../../types";
import { Gallery } from "react-grid-gallery";

export default function ImageGrid(props: ImageGridProps) {
  const { images } = props;
  return (
    <Card className="mt-3">
      <Card.Body>
        <Gallery enableImageSelection={false} images={images} />
      </Card.Body>
    </Card>
  );
}
