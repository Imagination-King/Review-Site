import { useState } from "react";
import PropTypes from "prop-types"
import Modal from "./Modal";

function ShowCard({show}) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return(
    <>
    <div onClick={handleCardClick}>
      <img src={show.ImageLink} alt={show.Title} style={{
        width: "150px",
        height: "225px"
      }}/>
      <p>{show.Title}</p>
    </div>
    {modalOpen && <Modal show={show} onClose={handleModalClose} />}
    </>
  );
}

ShowCard.propTypes = {
  show: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageLink: PropTypes.string.isRequired,
  }).isRequired,
}
export default ShowCard