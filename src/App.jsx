import React, { useState, useEffect } from 'react';
import SidePanel from './components/SidePanel/SidePanel';
import NewItemModal from './components/Modal/NewItemModal';
import mockData from './mockData.json';
import './App.css';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : mockData;
  });

  const user = { name: 'Cami' };
  const today = new Date();

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Expiry alerts
  const expiryAlerts = items
    .filter((item) => {
      const expiryDate = new Date(item.expiryDate);
      const timeUntilExpiry = expiryDate.getTime() - today.getTime();
      return timeUntilExpiry <= 86400000 && timeUntilExpiry > 0;
    })
    .map((item) => ({
      type: 'expiry',
      message: `🤢 Product will expire soon: ${item.name}`,
    }));

  // Low stock alerts for favorited items
  const lowStockAlerts = items
    .filter((item) => item.favorite && item.quantity < 2)
    .map((item) => ({
      type: 'lowStock',
      message: `✨ Favorite product running low: ${item.name}`,
    }));

  //expired alerts
  const expiredAlerts = items
    .filter((item) => new Date(item.expiryDate) < today)
    .map((item) => ({
      type: 'expired',
      message: `💩 Product Expired! Throw out: ${item.name}`,
    }));

  const allAlerts = [...expiryAlerts, ...lowStockAlerts, ...expiredAlerts];

  const addItem = (newItem) => {
    const updatedItems = editingItem
      ? items.map((item) =>
          item === editingItem ? { ...newItem, favorite: item.favorite } : item
        )
      : [...items, newItem];
    setItems(updatedItems);
    setShowModal(false);
    setEditingItem(null);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDeleteItem = (itemToDelete) => {
    setItems(items.filter((item) => item !== itemToDelete));
  };

  const incrementQuantity = (item) => {
    setItems(
      items.map((it) =>
        it === item ? { ...it, quantity: Number(it.quantity) + 1 } : it
      )
    );
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 0) {
      setItems(
        items.map((it) =>
          it === item ? { ...it, quantity: Number(it.quantity) - 1 } : it
        )
      );
    }
  };

  const toggleFavorite = (itemToToggle) => {
    setItems(
      items.map((item) =>
        item === itemToToggle ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  return (
    <div className="App">
      <SidePanel user={user} alerts={allAlerts} />
      <div className="dashboard">
        <header className="dashboard-header">
          <h3>Smart Refrigerator App 🥑</h3>
          <button
            className="add-item-button"
            onClick={() => {
              setShowModal(true);
              setEditingItem(null);
            }}
          >
            Add New Item
          </button>
        </header>
        <div className="item-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Favorites</th>
                <th>Expiry Date</th>
                <th>Quantity</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td onClick={() => handleEditItem(item)}>{item.name}</td>
                  <td onClick={() => toggleFavorite(item)}>
                    {item.favorite ? '⭐' : '☆'}
                  </td>
                  <td onClick={() => handleEditItem(item)}>
                    {item.expiryDate}
                  </td>
                  <td>
                    <button
                      onClick={() => decrementQuantity(item)}
                      className="quantity-button"
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      onClick={() => incrementQuantity(item)}
                      className="quantity-button"
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="delete-button"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewItemModal
        showModal={showModal}
        setShowModal={setShowModal}
        addItem={addItem}
        editingItem={editingItem}
      />
    </div>
  );
};

export default App;
