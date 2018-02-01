import React from 'react'
import Modal from 'react-modal'
document.body.style = 'overflow: auto'
class StoreModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.isModalOpen !== nextProps.isModalOpen) {
      if (nextProps.isModalOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  }

  render() {
    const { isModalOpen, onModalClose, modalContent } = this.props
    return (
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={onModalClose}
        closeTimeoutMS={0}
        style={{}}
        contentLabel="Modal"
      >
        <button onClick={onModalClose}>X</button>
        <h2>{modalContent.name}</h2>
        <p>{modalContent.benefit}</p>
      </Modal>
    )
  }
}

export default StoreModal
