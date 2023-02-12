import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { SearchBarProps } from "../../types";

export default function SearchBar(props: SearchBarProps) {
  const { searchValue, onChange, onKeyDown, onSearchButton, onClearButton } =
    props;
  return (
    <Card className="mt-5">
      <Card.Body>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <Form.Control
                className="me-auto"
                placeholder="Search images (e.g. cats)"
                value={searchValue}
                onChange={onChange}
                size="sm"
                onKeyDown={onKeyDown}
              />
              <Button size="sm" onClick={onSearchButton}>
                Search
              </Button>
              <div className="vr" />
              <Button
                size="sm"
                onClick={onClearButton}
                variant="outline-danger"
              >
                X
              </Button>
            </Stack>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
