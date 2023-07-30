import { useContext } from 'react';
import AutenticacionContext from '../contexts/AutenticacionContext';

const useAutenticacion = () => {
    return useContext(AutenticacionContext);
}  

export default useAutenticacion;