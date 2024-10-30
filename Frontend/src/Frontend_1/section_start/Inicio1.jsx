import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../FileUpload';
import styles from './inicio1.module.css';

const UserForm = ({ onClose, formType }) => {
    
    const [nombreUsuario, setnombreUsuario] = useState('');
    const [contrasena, setcontrasena] = useState('');
    const [email, setEmail] = useState('');
    const [genero, setGenero] = useState('');
    const [contacto, setContacto] = useState('');
    const [esCantautor, setEsCantautor] = useState(false);
    const [indiceGenero, setIndiceGenero] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

    const navigate = useNavigate();
    

    const generosDisponibles  = ['Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica', 'Reggaeton', 'Hip Hop', 'Tango', 'Electrónica'];
    
    

    const manejarCambioArchivo  = (event) => {
        const archivo  = event.target.files[0];
        setArchivoSeleccionado(archivo );
        setNombreArchivo(archivo  ? archivo.name : '');
    };

    const manejarCambioGenero  = (e) => {
        const generoSeleccionado  = e.target.value;
        setGenero(generoSeleccionado );
        const indice  = generosDisponibles .indexOf(generoSeleccionado );
        setIndiceGenero(indice  + 1);
    };

    const alternarTipoUsuario = (e, tipo) => {
        e.preventDefault();
        setEsCantautor(!tipo);
    };

    const registrarCantautor  = async () => {

        FileUpload({ folderName: 'Audio', file: archivoSeleccionado });
        try {
            const NewCataut = { nombre: nombreUsuario, contacto: Number(contacto), email: email, contrasenia: contrasena, rol: "Cantautor",imagenUsuario:nombreArchivo, genero:  { id: indiceGenero } };
            const response = await axios.post('http://localhost:8080/api/usuarios/registrarse', NewCataut, { withCredentials: true });
            if (response.status === 201) {
                
                console.log(response.status);
                navigate('/contenido');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error.response?.data || error.message);
        }
    };
    
    const registrarUsuario  = async () => {
        try {
            const NewCataut = { nombre: nombreUsuario, contacto: Number(contacto), email: email, contrasenia: contrasena, rol: "Usuario", genero: null };
            const response = await axios.post('http://localhost:8080/api/usuarios/registrarse', NewCataut, { withCredentials: true });
            if (response.status === 201) {
                
                navigate('/contenido');
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error.response?.data || error.message);
        }
    };

    const iniciarSesion = async () => {
        await axios.post('http://localhost:8080/api/usuarios/iniciarSesion',  null, {params: {email: email,contrasenia: contrasena}})
        .then(response => {
            console.log('Inicio de sesión exitoso:', response.data);
            const usuariostorage  = {
                email: email,
                nombre: contrasena
            };
            sessionStorage.setItem('datosUsuario', JSON.stringify(usuariostorage));
            navigate('/contenido');
        })
        .catch(error => {
            alert('Error al iniciar sesión: Credenciales invalida');
        });
    };




    const manejarEnvioFormulario = (e) => {
        e.preventDefault();
        if (formType === 'login') {
            iniciarSesion ();
        } else {
            if (!esCantautor) {
                registrarUsuario();
            } else {
                registrarCantautor();
            }
        }

        /* Despues de registrarce se limpian los campos */

        setnombreUsuario('');
        setEmail('');
        setGenero('');
        setcontrasena('');
        setContacto('');
    };




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
                    <form onSubmit={manejarEnvioFormulario}>
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
                                        value={nombreUsuario}
                                        required
                                        onChange={(e) => setnombreUsuario(e.target.value)}
                                    />
                                </div>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="contact" className={styles['label_ini1']}>Contacto</label>
                                    <input
                                        id="contact"
                                        type="number"
                                        placeholder="Ingresa tu número de contacto"
                                        className={styles['input_ini1']}
                                        value={contacto}
                                        required
                                        onChange={(e) => setContacto(e.target.value)}
                                        pattern="[0-9]*"
                                        inputMode="numeric"
                                    />
                                </div>
                            </>
                        )}
                        {esCantautor && (
                            <div>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="genre" className={styles['label_ini1']}>Tu Género Musical</label>
                                    <select
                                        id="genre"
                                        className={styles['input_ini1']}
                                        style={{ width: '100%' }}
                                        value={genero}
                                        required
                                        onChange={manejarCambioGenero}
                                    >
                                        <option className={styles['tttt']} value="" disabled hidden>Selecciona un género</option>
                                        {generosDisponibles .map((g) => (
                                            <option required className={styles['tttt']} key={g} value={g}>{g}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles['input-group_ini1']}>
                                    <label htmlFor="genre" className={styles['label_ini1']}>Foto de Perfil</label>
                                    <input className={styles['input_ini1']} id="image" type="file" accept="image/*" onChange={manejarCambioArchivo} required />
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
                                value={contrasena}
                                required
                                onChange={(e) => setcontrasena(e.target.value)}
                            />
                        </div>
                        <button className={styles['button_ini1']}>
                            {formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                        </button>
                        {formType === 'register' && (
                            <>
                                <p className={styles['cat']}>————ㅤoㅤ————</p>
                                <button className={styles['button_ini2']} onClick={(e) => alternarTipoUsuario(e, esCantautor)}>
                                    {esCantautor ? 'Registrarte Como Usuario' : 'Registrarte Como Cantautor'}
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
