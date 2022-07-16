import { Button } from "react-bootstrap";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";

export const ActionButtons = ({ url, id }) => {
  // Context
  const { deletePost, findPost, setShowUpdatePostModal } =
    useContext(PostContext);

  const handleChooseEditPost = (postId) => {
    findPost(postId);
    setShowUpdatePostModal(true);
  };

  return (
    <>
      <Button className="post-button" href={url} target="_blank">
        <img src={playIcon} alt="play" width="32" height="32" />
      </Button>
      <Button
        className="post-button"
        onClick={handleChooseEditPost.bind(this, id)}
      >
        <img src={editIcon} alt="edit" width="24" height="24" />
      </Button>
      <Button className="post-button">
        <img
          src={deleteIcon}
          alt="delete"
          width="24"
          height="24"
          onClick={deletePost.bind(this, id)}
        />
      </Button>
    </>
  );
};
