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
    const { message, success } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "info" : "danger" });
  };

  return (
    <Modal show={showUpdatePostModal} onHide={handleCloseDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChangeUpdatedPost}
              required
              aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
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
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={handleChangeUpdatedPost}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="select"
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
          <Button variant="secondary" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
