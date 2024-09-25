import axios from 'axios';
import React, { useState } from 'react';
import './inicio1.css';

const UserForm = ({ onClose, formType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [genre, setGenre] = useState('');
    const [Cataut, setCataut] = useState(false);
    const [NewCataut, setNewCataut] = useState({name:"",email:"",genre:"",password:""})
    const [NewUser, setNewUser] = useState({name:"",email:"",password:""})
    const [sign_in, setsign_in] = useState({name:"",password:""})


    const CreateCataut = async () => {
        try{
            //Esta línea envía una solicitud HTTP POST para agregar un nuevo usuario (NewCataut)
            const NewCataut = { name: username, email: email, genre: genre, password: password };
            await axios.post('http://localhost:3001/registrarcataut', NewCataut);

        }catch(error){
            console.error('Error en guardar el usuario:', error);
        }
    }
    const CreateUser = async () => {
        try{
            const NewUser = { name: username, email: email, password: password };
            await axios.post('http://localhost:3001/registrarUser', NewUser);

        }catch(error){
            console.error('Error en guardar el usuario:', error);
        }
    }

    const Sign_in_user = async () => {
        try{
            const sign_in = { name: username, password: password };
            await axios.post('http://localhost:3001/Iniciar', sign_in);

        }catch{
            console.error('Error en guardar el usuario:', error);
        }

    }

    const toggleForm = (e, type) => {
        e.preventDefault()
        if (type==true)
            {
                setCataut(false);
            }else {
                setCataut(true);
            }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formType == 'login'){
            Sign_in_user();
            console.log('Formulario enviado', { username, password});
        }else{
            if(Cataut==false){
                CreateUser();
                console.log('Formulario enviado', { username, password, email});
        }else{
            CreateCataut();
            console.log('Formulario enviado', {username, password, email, genre });
        }
        setUsername('');
        setEmail('');
        setGenre('');
        setPassword('');
    }
};

    const genres = ['Rock', 'Salsa', 'Joropo', 'Pop', 'Jazz', 'Clásica', 'Reggaeton', 'Hip Hop', 'Tango','Electrónica'];

    return (
        <div className="container_ini1">
            <div className="card_ini1">
                <div className="image-container_ini1">
                {formType === 'register' && (
                    <img src="/src/assets/imagenes/inicio1/ingresar.png" alt="Astronaut with balloons" className="image_ini1"/>
                )}
                {formType === 'login' && (
                    <img src="/src/assets/imagenes/inicio1/prueba3.png" alt="Astronaut with balloons" className="image_ini1"/>
                )}
                </div>
                <div className="form-container_ini1">
                    <h2 className="title_ini1">{formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>
                    <p className="subtitle_ini1">
                        {formType === 'login'
                            ? 'Ingresa tus credenciales para acceder a tu cuenta.'
                            : 'Crea una nueva cuenta para disfrutar de nuestros servicios.'}
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group_ini1">
                            <label htmlFor="username" className="label_ini1">Usuario</label>
                            <input
                                id="username"
                                placeholder="Ingresa tu usuario"
                                className="input_ini1"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        {formType === 'register' && (
                            <>
                                <div className="input-group_ini1">
                                    <label htmlFor="email" className="label_ini1">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Ingresa tu email"
                                        className="input_ini1"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        {Cataut && (<><div className="input-group_ini1">
                            <label htmlFor="genre" className="label_ini1">Tu Género Musical</label>
                            <select
                            id="genre"
                            className="input_ini1" style={{width: '100%'}}
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}><option className="tttt" value="" disabled hidden>Selecciona un género</option>
                            {genres.map((g) => (
                            <option className="tttt" key={g} value={g}>{g}</option>
                            ))}
                        </select>
                        </div></>)}
                        <div className="input-group_ini1">
                            <div className="label-container_ini1">
                                <label htmlFor="password" className="label_ini1">Contraseña</label>
                            </div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="input_ini1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="button_ini1">
                            {formType === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
                        </button>
                        {formType === 'register' && (
                            <><p className="cat">—————ㅤoㅤ—————</p>
                            
                            <button className="button_ini2" onClick={(e) => toggleForm(e,Cataut)} >{Cataut == true ? 'Registrarte Como Usuario' : 'Registrarte Como Cantautor'}
                            </button></>
                        )}
                    </form>
                    <p className="footer-text_ini1">
                        
                        Al continuar, aceptas nuestrosㅤ
                        <a href="#" className="link_ini1">Términos de uso</a>ㅤyㅤ
                        <a href="#" className="link_ini1">Política de privacidad</a>.
                    </p>
                </div>
                <div className="close-button_ini1" onClick={onClose}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default UserForm;