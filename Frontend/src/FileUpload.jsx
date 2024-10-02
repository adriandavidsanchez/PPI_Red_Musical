import { ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

const FileUpload = async ({ folderName, file }) => {
    if (file && folderName) {
        const storageRef = ref(storage, `${folderName}/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            console.log(`Archivo subido con éxito a la carpeta ${folderName}!`);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
        }
    }
};

export default FileUpload;

