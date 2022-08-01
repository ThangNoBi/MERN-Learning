import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../context/PostContext";

export const UpdatePostModal = () => {
  // Contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);
  const [validated, setValidated] = useState(false);

  const { title, description, url, status } = updatedPost;

  useEffect(() => setUpdatedPost(post), [post]);

  const handleChangeUpdatedPost = (e) => {
    let { name, value } = e.target;
    setUpdatedPost({
      ...updatedPost,
      [name]: value,
    });
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  // HandleSubmit Form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setValidated(true);

    const { message, success } = await updatePost(updatedPost);
    if (title && url !== "") {
      setShowUpdatePostModal(false);
    }
    setShowToast({
      show: true,
      message,
      type: success ? "info" : "danger",
    });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={handleCloseDialog}>
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
              onChange={handleChangeUpdatedPost}
              required
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
              onChange={handleChangeUpdatedPost}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="URL"
              name="url"
              value={url}
              required
              onChange={handleChangeUpdatedPost}
            />
            <Form.Control.Feedback type="invalid">
              URL is required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
              className="mt-3"
              name="status"
              value={status}
              onChange={handleChangeUpdatedPost}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="outline-success" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
