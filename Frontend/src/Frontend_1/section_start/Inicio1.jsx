import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../FileUpload';
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
    const [genreIndex, setGenreIndex] = useState(null);
    const [fileName, setFileName] = useState('');  // Estado para el nombre del archivo
    const [selectedFile, setSelectedFile] = useState(null);


    // Maneja el cambio de archivo seleccionado
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };

    const CreateCataut = async () => {

        FileUpload({ folderName: 'Audio', file: selectedFile });

        try {
            const NewCataut = { nombre: username, contacto: Number(contact), email: email, contrasenia: password, rol: "cantautor",imagenUsuario:fileName, genero:  { id: genreIndex } };
            const response = await axios.post('http://localhost:8080/api/usuarios/registrarse', NewCataut, { withCredentials: true });
            if (response.status === 201) {
                // Redirige a /contenido si el registro es exitoso
                console.log(response.status);
                navigate('/contenido');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error.response?.data || error.message);
        }
        /*
        try {
            const response = await axios.post('http://localhost:8080/uploadimg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log(response.data);  // Mensaje de éxito del backend
                console.log('Archivo subido correctamente');
            } else {
                console.error('Error al subir el archivo.');
                alert('Error al subir el archivo.');
            }
                
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Error al subir el archivo.');
        }
            */
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
        await axios.post('http://localhost:8080/api/usuarios/iniciarSesion',  null, {params: {email: email,contrasenia: password}})
        .then(response => {
            console.log('Inicio de sesión exitoso:', response.data);
            navigate('/contenido');
        })
        .catch(error => {
            alert('Error al iniciar sesión: Credenciales invalida');
        }); 
    };

    const toggleForm = (e, type) => {
        e.preventDefault();
        setCataut(!type);
        if (Cataut === true) {
            setRol("Cantautor");
        }
    };

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        setGenre(selectedGenre);
        const index = genres.indexOf(selectedGenre);
        setGenreIndex(index + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'login') {
            Sign_in_user();
        } else {
            if (!Cataut) {
                const numericValue = Number(contact);
                setContact(numericValue);
                CreateUser();
            } else {
                console.log(genreIndex);
                CreateCataut();
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
                            <label htmlFor="username" className={styles['label_ini1']}>Email</label>
                            <input
                                id="email"
                                placeholder="Ingresa tu email"
                                className={styles['input_ini1']}
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {formType === 'register' && (
                            <>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="email" className={styles['label_ini1']}>Nombre de Usuario</label>
                                    <input
                                        id="username"
                                        type="username"
                                        placeholder="Ingresa tu usuario"
                                        className={styles['input_ini1']}
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        required
                                        onChange={handleContactChange}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                    />
                                </div>
                            </>
                        )}
                        {Cataut && (
                            <div>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="genre" className={styles['label_ini1']}>Tu Género Musical</label>
                                    <select
                                        id="genre"
                                        className={styles['input_ini1']}
                                        style={{ width: '100%' }}
                                        value={genre}
                                        required
                                        onChange={handleGenreChange}
                                    >
                                        <option className={styles['tttt']} value="" disabled hidden>Selecciona un género</option>
                                        {genres.map((g) => (
                                            <option required className={styles['tttt']} key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="genre" className={styles['label_ini1']}>Foto de Perfil</label>
                                    <input className={styles['input_ini1']} id="image" type="file" accept="image/*" onChange={handleFileChange} required />
                                </div>
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
                                required
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
