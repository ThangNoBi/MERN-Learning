import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../context/PostContext";

const DeletePostModal = () => {
  // Context
  const {
    postState: {
      post: { _id },
    },
    showDeletePostModal,
    setShowDeletePostModal,
    deletePost,
  } = useContext(PostContext);

  const handleCloseModal = () => {
    setShowDeletePostModal(false);
  };

  const clickDel = (id) => {
    deletePost(id);
    setShowDeletePostModal(false);
    console.log("Show ID from Modal", id);
  };

  return (
    <Modal show={showDeletePostModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure to delete</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={clickDel.bind(this, _id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeletePostModal;
