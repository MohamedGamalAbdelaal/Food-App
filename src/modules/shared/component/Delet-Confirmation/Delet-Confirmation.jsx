import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Delete from '../../../../assets/Images/model.svg'

const DeletConfirmation = ({show,handleClose,deletItem,deleteFun}) => {    
    return <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body className=' flex-column d-flex justify-content-center align-items-center'>
          <img className='w-75 h-75 mb-5' src={Delete} alt="" />
          <h4>Delete This {deletItem}</h4>
          <p className='text-muted text-center mb-4'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn btn-danger' variant="danger" onClick={deleteFun}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
}

export default DeletConfirmation;
