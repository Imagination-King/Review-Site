import { useState } from "react";
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
      <p>{show.SortName}</p>
    </div>
    {modalOpen && <Modal show={show} onClose={handleModalClose} />}
    </>
  );
}
export default ShowCard