import React, { useContext } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../context/PostContext";

const DeletePostModal = ({ onProps: { _id } }) => {
  // Context
  const { showDeletePostModal, setShowDeletePostModal, deletePost } =
    useContext(PostContext);

  const handleCloseModal = () => {
    setShowDeletePostModal(false);
  };

  const clickDel = (id) => {
    deletePost(id);
    setShowDeletePostModal(false);
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
          <Button
            variant="outline-danger"
            onClick={() => {
              clickDel(_id);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeletePostModal;
