import styles from '../styles/Home.module.css';

const Orders = ({ orders, onUpdateStatus }) => {
return (
<table className={`${styles.table} ${styles.cardtable}`}>
<thead>
<tr>
<th>Order.No</th>
<th>Farmer</th>
<th>Land Size</th>
<th>Fertilizers</th>
<th>Seeds</th>
<th>Total Amount</th>
<th>Date</th>
<th>Status</th>
<th>
Actions
</th>
</tr>
</thead>

<tbody>

{orders.map((order) => (
<tr key={order._id}>
<td>#{order._id}</td>
<td>{ order.farmerName }</td>
<td>{ order.landSize } acres</td>
<td>{ order.fertilizer ? order.fertilizer : null } { order.fertilizerQuantity? order.fertilizerQuantity :  '0'}Kg</td>
<td>{ order.seed ? order.seed : null } {order.seedQuantity ? order.seedQuantity : '0'}Kg</td>

<td>RWF { order.totalAmount ? order.totalAmount : '0' }</td>

<td>{ order.dateCreated }</td>
<td>{ order.status }</td>

<td className={styles.actionstable}>

{order.status !== 'approved' && 
<span className={styles.loginbtn} onClick={() => onUpdateStatus(order._id, 'approved')}>Approve</span>}

{order.status !== 'rejected' && 
<span className={styles.cancel} onClick={() => onUpdateStatus(order._id, 'rejected')}>Reject</span>}

</td>
</tr>
))}

</tbody>
</table>
);
};

export default Orders;