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
        formData.append('audio', selectedFile);  // Añade el archivo seleccionado al FormData

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log(response.data);  // Mensaje de éxito del backend
                alert('Archivo subido correctamenteAAA');
            } else {
                console.error('Error al subir el archivo.OOO');
                alert('Error al subir el archivo.');
            }
        } catch (error) {
            console.error('Error al subir el archivo:IIII', error);
            alert('Error al subir el archivo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="audio">Audio de la canción</label>
                <input id="audio" type="file" accept="audio/*" onChange={handleFileChange} required />
            </div>
            <button type="submit">Subir</button>
        </form>
    );
};

export default FileUploadForm;
