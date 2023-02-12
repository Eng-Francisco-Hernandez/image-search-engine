import { Button, Card } from "react-bootstrap";
import { ImageGridProps } from "../../types";
import { Gallery } from "react-grid-gallery";

export default function ImageGrid(props: ImageGridProps) {
  const { images, showMore } = props;
  return (
    <Card className="mt-3">
      <Card.Body>
        <Gallery enableImageSelection={false} images={images} />
        <br />
        {showMore && (
          <div className="d-grid gap-2">
            <Button onClick={showMore} variant="primary">
              Show more
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
