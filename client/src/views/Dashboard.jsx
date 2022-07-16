import { useContext, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Spinner,
  Toast,
  Tooltip,
} from "react-bootstrap";
import { AuthContext } from "../components/context/AuthContext";
import { PostContext } from "../components/context/PostContext";
import { AddPostModal } from "../components/post/AddPostModal";
import { SinglePost } from "../components/post/SinglePost";
import addIcon from "../assets/plus-circle-fill.svg";
import { UpdatePostModal } from "../components/post/UpdatePostModal";

export const Dashboard = () => {
  // Auth Context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  // Post Context
  const {
    postState: { post, posts, postLoading },
    getPosts,
    setShowPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  // Get all post
  useEffect(() => {
    getPosts();
  }, []);

  let body;
  let toast;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to Learn</Card.Title>
            <Card.Text>
              Click to the button below to track your first skill to learn
            </Card.Text>
            <Button variant="success">LearnIt</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a something to learn</Tooltip>}
        >
          {/* Open Add Post Modal  */}
          <Button
            className="btn-floating"
            onClick={setShowPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  toast = (
    <Toast
      show={show}
      style={{ position: "fixed", top: "20%", right: "10px" }}
      className={`bg-${type} text-white`}
      onClose={setShowToast.bind(this, {
        show: false,
        message: "",
        type: null,
      })}
      delay={3000}
      autohide
    >
      <Toast.Body>
        <strong>{message}</strong>
      </Toast.Body>
    </Toast>
  );

  return (
    <>
      {body}
      <AddPostModal />
      {toast}
      {post !== null && <UpdatePostModal />}
    </>
  );
};
