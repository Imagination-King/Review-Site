import PropTypes from "prop-types"

function Modal({show, onClose}) { 

  return(
  <div style={{
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    color: 'black',
    padding: '20px',
    zIndex: '1000',
    border: '1px solid black'
  }}>
    <h2>{show.Title}</h2>
    <img src={show.ImageLink} alt={show.Title} style={{width: '300px', height: '450px'}} />
    <p><strong>Watch Status:</strong> {show.WatchStatus}</p>
    <p><strong>Tier:</strong> {show.Tier}</p>
    <p>{show.Tags.join(", ")}</p>
    <p><strong>Review:</strong> {show.Review}</p>
    <button onClick={onClose}>Close</button>
  </div>)
}

Modal.propTypes = {
  show: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageLink: PropTypes.string.isRequired,
    WatchStatus: PropTypes.string,
    Tier: PropTypes.string.isRequired,
    Tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    Review: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal