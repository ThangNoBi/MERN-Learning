import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../context/PostContext";

export const AddPostModal = () => {
  // Contexts
  const { showPostModal, setShowPostModal, addPost, setShowToast } =
    useContext(PostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  });

  const { title, description, url } = newPost;

  const [validated, setValidated] = useState(false);

  const handleChangeNewPost = (e) => {
    let { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  // Handle close dialog & Reset data
  const handleResetData = () => {
    setShowPostModal(false);
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    });
  };

  // HandleSubmit Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const { message, success } = await addPost(newPost);
    if (title && url !== "") {
      handleResetData();
      setValidated(false);
    } else {
      setValidated(true);
    }
    // handleResetData();
    setShowToast({ show: true, message, type: success ? "info" : "danger" });
  };

  return (
    <Modal show={showPostModal} onHide={handleResetData}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitForm} noValidate validated={validated}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChangeNewPost}
              required
              aria-describedby="title-help"
            />
            <Form.Control.Feedback type="invalid">
              Title is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChangeNewPost}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              required
              onChange={handleChangeNewPost}
            />
            <Form.Control.Feedback type="invalid">
              URL is required
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleResetData}>
            Cancel
          </Button>
          <Button variant="outline-primary" type="submit">
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
