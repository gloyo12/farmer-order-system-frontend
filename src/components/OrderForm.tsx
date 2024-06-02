import React, { useState, useEffect } from 'react';
import { createOrder, getAllFertilizers, getAllSeeds } from '../utils/api';
import styles from '../styles/Home.module.css';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    farmerName: '',
    landSize: '',
    fertilizer: '',
    seed: '',
    fertilizerQuantity: '',
    seedQuantity: ''
  });

  const [fertilizers, setFertilizers] = useState([]);
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    fetchFertilizers();
    fetchSeeds();
  }, []);

  const fetchFertilizers = async () => {
    const response = await getAllFertilizers();
    setFertilizers(response);
  };

  const fetchSeeds = async () => {
    const response = await getAllSeeds();
    setSeeds(response);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { landSize, fertilizer, seed, fertilizerQuantity, seedQuantity } = formData;

    // Ensure at least one of either seed or fertilizer and their respective quantity is provided
    if (!fertilizer && !seed) {
      return alert('You must provide at least one of either fertilizer or seed.');
    }
    if (fertilizer && !fertilizerQuantity) {
      return alert('You must provide the quantity of fertilizer.');
    }
    if (seed && !seedQuantity) {
      return alert('You must provide the quantity of seed.');
    }

    if (fertilizerQuantity && landSize * 3 < fertilizerQuantity) {
      return alert('Fertilizer quantity exceeds limit based on land size');
    }

    if (seedQuantity && landSize * 1 < seedQuantity) {
      return alert('Seed quantity exceeds limit based on land size');
    }

    // Compatibility check
    if (fertilizer && seed) {
      const selectedFertilizer = fertilizers.find(f => f.name === fertilizer);
      if (selectedFertilizer && !selectedFertilizer.compatibleSeeds.includes(seed)) {
        return alert('Selected fertilizer is not compatible with selected seed');
      }
    }

    // Calculate total amount
    let totalAmount = 0;
    if (fertilizer) {
      const selectedFertilizer = fertilizers.find(f => f.name === fertilizer);
      if (selectedFertilizer) {
        totalAmount += selectedFertilizer.price * fertilizerQuantity;
      }
    }
    if (seed) {
      const selectedSeed = seeds.find(s => s.name === seed);
      if (selectedSeed) {
        totalAmount += selectedSeed.price * seedQuantity;
      }
    }

    try {
      await createOrder({ ...formData, totalAmount });
      alert('Order created successfully');
    } catch (error) {
      console.log(error);
      alert('Error creating order');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formadd}>
      <input type="text" name="farmerName" value={formData.farmerName} onChange={handleChange} placeholder="Farmer Name" required className={styles.inputForm} />
      <input type="number" name="landSize" value={formData.landSize} onChange={handleChange} placeholder="Land Size" required className={styles.inputForm}/>
      <select name="fertilizer" value={formData.fertilizer} onChange={handleChange} className={styles.inputForm}>
        <option value="">Select Fertilizer</option>
        {fertilizers.map(fertilizer => (
          <option key={fertilizer._id} value={fertilizer.name}>{fertilizer.name}</option>
        ))}
      </select>
      <input type="number" name="fertilizerQuantity" value={formData.fertilizerQuantity} onChange={handleChange} placeholder="Fertilizer Quantity" className={styles.inputForm}/>
      <select name="seed" value={formData.seed} onChange={handleChange} className={styles.inputForm}>
        <option value="">Select Seed</option>
        {seeds.map(seed => (
          <option key={seed._id} value={seed.name}>{seed.name}</option>
        ))}
      </select>
      <input type="number" className={styles.inputForm}  name="seedQuantity" value={formData.seedQuantity} onChange={handleChange} placeholder="Seed Quantity" />
      <button className={styles.submit} type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
