import styles from '../styles/Home.module.css';

const FertilizersList = ({ fertilizers, handleDeleteFertilizer }) => {
return (
<table className={`${styles.table} ${styles.cardtable}`}>
<thead>
<tr>
<th>Item.No</th>
<th>Name</th>
<th>Price</th>
<th>Compatible Seeds</th>
<th>
Actions
</th>
</tr>
</thead>

<tbody>

{fertilizers.map((fertilizer) => (
<tr key={fertilizer._id}>
<td>#{fertilizer._id}</td>
<td>{ fertilizer.name }</td>
<td>RWF{ fertilizer.price?fertilizer.price: '0' }</td>
<td>{fertilizer.compatibleSeeds.join(', ')}</td>

<td className={styles.actionstable}>
<span className={styles.cancel} onClick={() => handleDeleteFertilizer(fertilizer._id)}>Delete</span>
</td>
</tr>
))}

</tbody>
</table>
);
};

export default FertilizersList;