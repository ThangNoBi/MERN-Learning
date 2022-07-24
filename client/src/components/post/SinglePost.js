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
            <h3 className="post-title">{title}</h3>
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

      <span>{description}</span>
    </Card.Body>
  </Card>
);
