import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Rental from "../../models/Rental";

interface ReturnModalProps {
  show: boolean;
  handleClose: () => void;
  returnedRental: Rental;
}

function ReturnModal({ handleClose, show, returnedRental }: ReturnModalProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>{`${returnedRental.game.title} rented by ${returnedRental.customer.name}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Date out: {new Date(returnedRental.dateOut).toDateString()}</p>
          <p>Date returned: {new Date(returnedRental?.dateReturned as Date).toDateString()}</p>
          <p>Rental fee: {returnedRental.rentalFee}&euro;</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReturnModal;
