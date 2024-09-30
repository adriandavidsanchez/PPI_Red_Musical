import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './inicio1.module.css';


const UserForm = ({ onClose, formType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [genre, setGenre] = useState('');
    const [contact, setContact] = useState('');
    const [Cataut, setCataut] = useState(false);
    const [rol, setRol] = useState('Usuario');
    const [NewCataut, setNewCataut] = useState({ name: "", contact: "", email: "", password: "", rol: "", genre: "" });
    const [sign_in, setsign_in] = useState({ name: "", password: "" });

    const navigate = useNavigate();
    const CreateCataut = async () => {
        try {
            const NewCataut = { nombre: username, contacto: Number(contact), email: email, contrasenia: password, rol: rol, genero: { id: 1 } };
            const response = await axios.post('http://localhost:8080/api/usuarios/registrarse', NewCataut, { withCredentials: true });
            if (response.status === 201) {
                // Redirige a /contenido si el registro es exitoso
                console.log(response.status);
                navigate('/contenido');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error.response?.data || error.message);
        }
    };

    const CreateUser = async () => {
        try {
            const NewCataut = { nombre: username, contacto: Number(contact), email: email, contrasenia: password, rol: rol, genero: null };
            await axios.post('http://localhost:8080/api/usuarios/registrarse', NewCataut, { withCredentials: true });
            if (NewCataut.status === 201) {
                // Redirige a /contenido si el registro es exitoso
                navigate('/contenido');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error.response?.data || error.message);
        }
    };

    const Sign_in_user = async () => {
        try {
            const sign_in = { name: username, password: password };
            await axios.post('http://localhost:3001/Iniciar', sign_in);
        } catch (error) {
            console.error('Error en guardar el usuario:', error);
        }
    };

    const toggleForm = (e, type) => {
        e.preventDefault();
        setCataut(!type);
        if (Cataut === true) {
            setRol("Cantautor");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'login') {
            Sign_in_user();
            console.log('Formulario enviado', { username, password });
        } else {
            if (!Cataut) {
                const numericValue = Number(contact);
                setContact(numericValue);
                CreateUser();
                console.log('Formulario enviado', { username, password, email, contact, genre });
            } else {
                CreateCataut();
                console.log('Formulario enviado', { username, password, email, genre, contact });
            }
        }
        setUsername('');
        setEmail('');
        setGenre('');
        setPassword('');
        setContact('');
    };

    const handleContactChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setContact(value);
    };

    const genres = ['Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica', 'Reggaeton', 'Hip Hop', 'Tango', 'Electrónica'];

    return (
        <div className={styles['container_ini1']}>
            <div className={styles['card_ini1']}>
                <div className={styles['image-container_ini1']}>
                    {formType === 'register' && (
                        <img src="/src/assets/imagenes/inicio1/ingresar.png" alt="Astronaut with balloons" className={styles['image_ini1']} />
                    )}
                    {formType === 'login' && (
                        <img src="/src/assets/imagenes/inicio1/prueba3.png" alt="Astronaut with balloons" className={styles['image_ini1']} />
                    )}
                </div>
                <div className={styles['form-container_ini1']}>
                    <h2 className={styles['title_ini1']}>{formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    <p className={styles['subtitle_ini1']}>
                        {formType === 'login'
                            ? 'Ingresa tus credenciales para acceder a tu cuenta.'
                            : 'Crea una nueva cuenta para disfrutar de nuestros servicios.'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['input-group_ini1']}>
                            <label htmlFor="username" className={styles['label_ini1']}>Usuario</label>
                            <input
                                id="username"
                                placeholder="Ingresa tu usuario"
                                className={styles['input_ini1']}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {formType === 'register' && (
                            <>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="email" className={styles['label_ini1']}>Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Ingresa tu email"
                                        className={styles['input_ini1']}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="contact" className={styles['label_ini1']}>Contacto</label>
                                    <input
                                        id="contact"
                                        type="number"
                                        placeholder="Ingresa tu número de contacto"
                                        className={styles['input_ini1']}
                                        value={contact}
                                        onChange={handleContactChange}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                    />
                                </div>
                            </>
                        )}
                        {Cataut && (
                            <div className={styles['input-group_ini1']}>
                                <label htmlFor="genre" className={styles['label_ini1']}>Tu Género Musical</label>
                                <select
                                    id="genre"
                                    className={styles['input_ini1']}
                                    style={{ width: '100%' }}
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option className={styles['tttt']} value="" disabled hidden>Selecciona un género</option>
                                    {genres.map((g) => (
                                        <option className={styles['tttt']} key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className={styles['input-group_ini1']}>
                            <div className={styles['label-container_ini1']}>
                                <label htmlFor="password" className={styles['label_ini1']}>Contraseña</label>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className={styles['input_ini1']}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className={styles['button_ini1']}>
                            {formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                        </button>
                        {formType === 'register' && (
                            <>
                                <p className={styles['cat']}>————ㅤoㅤ————</p>
                                <button className={styles['button_ini2']} onClick={(e) => toggleForm(e, Cataut)}>
                                    {Cataut ? 'Registrarte Como Usuario' : 'Registrarte Como Cantautor'}
                                </button>
                            </>
                        )}
                    </form>
                    <p className={styles['footer-text_ini1']}>
                        Al continuar, aceptas nuestrosㅤ
                        <a href="#" className={styles['link_ini1']}>Términos de uso</a>ㅤyㅤ
                        <a href="#" className={styles['link_ini1']}>Política de privacidad</a>.
                    </p>
                </div>
                <div className={styles['close-button_ini1']} onClick={onClose}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default UserForm;
