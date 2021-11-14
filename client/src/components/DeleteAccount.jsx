import { Modal, Button } from 'react-bootstrap'

export default function DeleteAccount({ showDelete, handleCloseDelete, setConfirmDelete,deleteId }) {

    const handleDelete = () => {setConfirmDelete(true)}
    return (
        <>
        <button className="btn text-light bg-red bold py-2 px-4 br " onClick={deleteId} >Delete Account</button>
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
