import React, { useState } from 'react';
import './NewItemModal.css';

const NewItemModal = ({ showModal, setShowModal, addItem }) => {
  // State for the item name, expiration date, and quantity
  const [itemName, setItemName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [quantity, setQuantity] = useState(''); // New state for quantity

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the new item object including the quantity
    const newItem = {
      name: itemName,
      expiryDate: expDate,
      quantity: quantity, // Include quantity when adding the item
    };

    // Call the addItem function passed from the parent component with the new item
    addItem(newItem);

    // Reset the form fields for next input
    setItemName('');
    setExpDate('');
    setQuantity('');

    // Close the modal
    setShowModal(false);
  };

  // If showModal is false, don't render the modal
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <label>
            Item Name:
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date"
              value={expDate}
              onChange={(e) => setExpDate(e.target.value)}
              required
            />
          </label>
          <label>
            {' '}
            {/* New input field for quantity */}
            Quantity:
            <input
              type="number" // 'number' type for better input control
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <div className="modal-actions">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="cancel-button"
            >
              Cancel 🚫
            </button>
            <button type="submit" className="submit-button">
              Submit ✅
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewItemModal;
