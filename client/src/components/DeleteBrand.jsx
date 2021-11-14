import { Modal, Button } from 'react-bootstrap'
import Delete from '../assets/img/Delete.png'
export default function DeleteBrand({ showDelete, handleCloseDelete, setConfirmDelete,deleteId }) {

    const handleDelete = () => {setConfirmDelete(true)}
    return (
        <>
        <img src={Delete} onClick={deleteId} />
        <Modal show={showDelete} onHide={handleCloseDelete} centered>
            <Modal.Body className="text-dark">
                <div style={{fontSize: '20px', fontWeight: '900'}}>
                    Delete Data
                </div>
                <div style={{fontSize: '16px', fontWeight: '500'}} className="mt-2 text-success">
                    Are you sure you want to delete this Link?
                </div>
                <div className="text-end mt-5">
                    <Button onClick={handleDelete} size="sm" className="btn-danger me-2" style={{width: '135px'}}>Yes</Button>
                    <Button onClick={handleCloseDelete} size="sm" className="btn-secondary" style={{width: '135px'}}>No</Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    )
}
