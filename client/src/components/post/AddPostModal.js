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
    handleResetData();
    setShowToast({ show: true, message, type: success ? "info" : "danger" });
  };

  return (
    <Modal show={showPostModal} onHide={handleResetData}>
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
              onChange={handleChangeNewPost}
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
              onChange={handleChangeNewPost}
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={handleChangeNewPost}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleResetData}>
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
