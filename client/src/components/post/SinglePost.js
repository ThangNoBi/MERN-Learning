import { Badge, Card, Col, Row } from "react-bootstrap";
import { ActionButtons } from "./ActionButton";

export const SinglePost = ({
  post: { _id, status, title, description, url },
}) => (
  <Card
    className="shadow"
    border={
      status === "LEARNED"
        ? "success"
        : status === "LEARNING"
        ? "info"
        : "danger"
    }
    style={{ height: "130px" }}
  >
    <Card.Body>
      <Card.Title>
        <Row>
          <Col>
            <p className="post-title">{title}</p>
            <Badge
              pill
              bg={
                status === "LEARNED"
                  ? "success"
                  : status === "LEARNING"
                  ? "info"
                  : "danger"
              }
              style={{ backgroundColor: "none" }}
            >
              {status}
            </Badge>
          </Col>
          <Col className="text-end">
            <ActionButtons url={url} id={_id} />
          </Col>
        </Row>
      </Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);
