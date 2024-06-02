import styles from '../styles/Home.module.css';

const SeedsList = ({ seeds, handleDeleteSeed }) => {
return (
<table className={`${styles.table} ${styles.cardtable}`}>
<thead>
<tr>
<th>Item.No</th>
<th>Name</th>
<th>Price</th>
<th>
Actions
</th>
</tr>
</thead>

<tbody>

{seeds.map((seed) => (
<tr key={seed._id}>
<td>#{seed._id}</td>
<td>{ seed.name }</td>
<td>RWF{ seed.price?seed.price: '0' }</td>

<td className={styles.actionstable}>
<span className={styles.cancel} onClick={() => handleDeleteSeed(seed._id)}>Delete</span>
</td>
</tr>
))}

</tbody>
</table>
);
};

export default SeedsList;