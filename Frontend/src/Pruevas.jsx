import axios from 'axios';
import { useState } from 'react';

const FileUploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);  // Estado para el archivo seleccionado

    // Maneja el cambio de archivo seleccionado
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);  // Almacena el archivo seleccionado en el estado
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('video', selectedFile);  // Añade el archivo seleccionado al FormData

        try {
            const response = await axios.post('http://localhost:8080/uploadimg', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log(response.data);  // Mensaje de éxito del backend
                alert('Archivo subido correctamente');
            } else {
                console.error('Error al subir el archivo.');
                alert('Error al subir el archivo.');
            }
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Error al subir el archivo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="video">Audio de la canción</label>
                <input id="video" type="file" accept="video/*" onChange={handleFileChange} required />
            </div>
            <button type="submit">Subir</button>
        </form>
    );
};

export default FileUploadForm;
