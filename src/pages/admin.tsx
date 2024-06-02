import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Orders from '../components/Orders';
import FertilizersList from '../components/FertilizersList';
import SeedsList from '../components/SeedsList';
import { addFertilizer, deleteFertilizer, getAllFertilizers, addSeed, deleteSeed, getAllSeeds } from '../utils/api';
import styles from '../styles/Home.module.css';
import { getOrders, updateOrderStatus, logout } from '../utils/api';

const Admin = () => {
const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const limit = 5;
const [selectedTab, setselectedTab] = useState('fertilizers');
const [fertilizers, setFertilizers] = useState([]);
const [seeds, setSeeds] = useState([]);
const [fertilizerName, setFertilizerName] = useState('');
const [fertilizerPrice, setfertilizerPrice] = useState(0);
const [seedName, setSeedName] = useState('');
const [compatibleSeeds, setCompatibleSeeds] = useState('');
const [seedPrice, setSeedPrice] = useState(0);



const [orders, setOrders] = useState([]);
const router = useRouter();

const fetchOrders = async (page) => {
const response = await getOrders(page, limit);
setOrders(response.orders);
setTotalPages(response.totalPages);
};

const handlePreviousPage = () => {
if (currentPage > 1) {
setCurrentPage(currentPage - 1);
}
};

const handleNextPage = () => {
if (currentPage < totalPages) {
setCurrentPage(currentPage + 1);
}
};

const handleLogout = async () => {
await logout();
router.push('/login');
};

const handleUpdateStatus = async (id, status) => {
await updateOrderStatus(id, status);
fetchOrders();
};

useEffect(() => {
fetchOrders(currentPage);
fetchFertilizers();
fetchSeeds();
}, [currentPage]);


const fetchFertilizers = async () => {
const response = await getAllFertilizers();
setFertilizers(response);
};

const fetchSeeds = async () => {
const response = await getAllSeeds();
setSeeds(response);
};

const handleAddFertilizer = async () => {
const compatibleSeedsArray = compatibleSeeds.split(',').map(seed => seed.trim());
await addFertilizer({ name: fertilizerName, compatibleSeeds: compatibleSeedsArray,price:fertilizerPrice });
fetchFertilizers();
};

const handleDeleteFertilizer = async (id) => {
await deleteFertilizer(id);
fetchFertilizers();
};

const handleAddSeed = async () => {
await addSeed({ name: seedName,price:seedPrice });
fetchSeeds();
};

const handleDeleteSeed = async (id) => {
await deleteSeed(id);
fetchSeeds();
};



return (
<div>
<div className={styles.dashboardnavbar}>
<h1 className={styles.dashboardtitle}>Dashboard</h1>
<span onClick={handleLogout} className={styles.logout}>Logout</span>
</div>

<ul className={styles.dashboardMenucontainer}>
<li onClick={()=>setselectedTab('orders')} className={selectedTab === 'orders' ? styles.active : null}>Orders</li>
<li onClick={()=>setselectedTab('fertilizers')} className={selectedTab === 'fertilizers' ? styles.active : null}>Fertilizers</li>
<li onClick={()=>setselectedTab('seeds')} className={selectedTab === 'seeds' ? styles.active : null}>Seeds</li>
</ul>


<div className={styles.tablecontainer}>

{selectedTab === 'orders' && 
<div>
<button onClick={handlePreviousPage} disabled={currentPage === 1}>
Previous
</button>
<span>Page {currentPage} of {totalPages}</span>
<button onClick={handleNextPage} disabled={currentPage === totalPages}>
Next
</button>
</div>
}
{selectedTab === 'orders' && <Orders orders={orders} onUpdateStatus={handleUpdateStatus} />}


{/*fertilizers*/}
{selectedTab === 'fertilizers' &&
<div className={styles.formadd}>
<input
type="text"
value={fertilizerName}
onChange={(e) => setFertilizerName(e.target.value)}
placeholder="Fertilizer Name"
className={styles.inputForm}
/>
<input
type="text"
value={compatibleSeeds}
onChange={(e) => setCompatibleSeeds(e.target.value)}
placeholder="Compatible Seeds (comma-separated)"
className={styles.inputForm}
/>
<input
type="number"
value={fertilizerPrice}
onChange={(e) => setfertilizerPrice(e.target.value)}
placeholder="Price of Fertilizer"
className={styles.inputForm}
/>
<button className={styles.submit} onClick={handleAddFertilizer}>Add Fertilizer</button>
</div>}
{selectedTab === 'fertilizers' && <FertilizersList fertilizers={fertilizers} handleDeleteFertilizer={handleDeleteFertilizer}/>}



{/*seeds*/}
{selectedTab === 'fertilizers' &&
<div className={styles.formadd}>
<input
type="text"
value={seedName}
onChange={(e) => setSeedName(e.target.value)}
placeholder="Seed Name"
className={styles.inputForm}
/>
<input
type="number"
value={seedPrice}
onChange={(e) => setSeedPrice(e.target.value)}
placeholder="Seed Price"
className={styles.inputForm}
/>
<button className={styles.submit} onClick={handleAddSeed}>Add Seed</button>
</div>}
{selectedTab === 'seeds' && <SeedsList seeds={seeds} handleDeleteSeed={handleDeleteSeed}/>}



</div>


</div>
);
};

export default Admin;