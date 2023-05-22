import {useEffect, useRef} from 'react'
import './modal.css'
export default function Modal({handleDelete, handleClose, short}) {
  const ref = useRef()
  useEffect(() => {
    const handleClickOutside = event => {
      if (!ref.current.contains(event.target)) {
        handleClose()
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })
  return (
    <div className='modal-outer'>
      <div className='custom-modal' ref={ref}>
        <h2>
          Are you sure you want to delete{' '}
          <span className='modal-short-name'>{short.title}</span> from your
          shorts?
        </h2>
        <div className='modal-buttons'>
          <button className='modal-btn cancel-btn' onClick={handleClose}>
            Cancel
          </button>
          <button
            className='modal-btn confirm-delete-btn'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
