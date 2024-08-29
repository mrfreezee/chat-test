const ModalOverlay = ({ closeModal, modalType }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            {modalType === 'info' && <p>Здесь должна быть важная информация о чате.</p>}
            {modalType === 'report' && <p>Здесь можно подать апелляцию.</p>}
        </div>
    </div>
);

export default ModalOverlay