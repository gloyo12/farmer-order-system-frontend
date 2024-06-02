import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { login } from '../utils/api';

const Login = () => {
const [username, setUsername] = useState('');
const [isloading, setLoading] = useState(false);
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLoading(true);
try {
await login({ username, password });
router.push('/admin');
} catch (err) {
setLoading(false);
setError('Invalid credentials');
}
};

return (
<div className={styles.loginmain}>

<div className={styles.formcontainer}>
<h1 className={styles.titlelogin}>Admin Login</h1>
{error && <p className={styles.error}>{error}</p>}
<form onSubmit={handleSubmit} className={styles.formlogin}>
<input
type="text"
className={styles.inputForm}
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="Username"
required
/>
<input
type="password"
className={styles.inputForm}
value={password}
onChange={(e) => setPassword(e.target.value)}
placeholder="Password"
required
/>
<button className={styles.submit} type="submit">Login</button>
</form>
</div>
{isloading && 
<div className={styles.loadercontainer}>Loading...</div>
}
</div>
);
};

export default Login;