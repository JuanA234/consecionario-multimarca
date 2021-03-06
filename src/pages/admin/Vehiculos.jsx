import React, {useEffect , useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const vehiculosBackend = [
    {
        nombre:"Corolla",
        marca:"Toyota",
        modelo:2014
    },
    {
        nombre:"Sandero",
        marca:"Renault",
        modelo:2020
    },
    {
        nombre:"Rav4",
        marca:"Toyota",
        modelo:2011
    },
    {
        nombre:"Fiesta",
        marca:"Ford",
        modelo:2017
    },
    {
        nombre:"Mazda 3",
        marca:"Mazda",
        modelo:2020
    },
    {
        nombre:"Chrevolet",
        marca:"Onix",
        modelo:2021
    }
    
];

const Vehiculos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const[vehiculos, setVehiculos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear nuevo vehículo');
    const [colorBoton, setColorBoton] = useState('indigo');

    useEffect(()=>{
        //Obtener lista de vehículos desde el backend
        setVehiculos(vehiculosBackend);
    },[]);

    useEffect(()=>{
        if(mostrarTabla){
            setTextoBoton('Crear nuevo vehículo');
            setColorBoton('indigo');
        }
        else{
            setTextoBoton('Mostrar todo');
            setColorBoton('blue');
        }
    },[mostrarTabla]);

    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col'>
            <h2 className='text-3xl font-extrabold text-gray-900'>Página de administración de vehículos</h2>
            <button onClick={()=>{
                setMostrarTabla(!mostrarTabla);
            }} 
            className={`text-white bg-${colorBoton}-500 p-4 rounded-full m-6 self-end`}>
            {textoBoton}
            </button>
            </div>
            {mostrarTabla ?  <TablaVehiculos listaVehiculos={vehiculos} /> 
            :<FormularioCreacionVehiculos funcionParaMostarLaTabla={setMostrarTabla}
            listaVehiculos={vehiculos}
            funcionParaAgregarUnVehiculo={setVehiculos} />}
            <ToastContainer position='bottom-center' autoClose={5000} />

        </div>
    );
};

const TablaVehiculos = ({listaVehiculos}) =>{
   
    return(
    <div className='flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-extrabold text-gray-800'>Todos los vehículos</h2>
        <table>
            <thead>
                <tr>
                     <th>Nombre del vehículo</th>
                     <th>Marca del vehículo</th>  
                     <th>Modelo del vehículo</th>        
                </tr>
            </thead>
            <tbody>
                {listaVehiculos.map((vehiculo)=>{
                    return(
                        <tr>
                            <td>{vehiculo.nombre}</td> 
                            <td>{vehiculo.marca}</td> 
                            <td>{vehiculo.modelo}</td> 
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    );
}

const FormularioCreacionVehiculos = ({funcionParaMostarLaTabla , listaVehiculos, funcionParaAgregarUnVehiculo}) =>{
    const [nombre, setNombre] = useState();
    const [marca, setMarca] = useState();
    const [modelo, setModelo] = useState();

    const enviarAlBackend = () => {
        toast.success('Vehículo agregado con éxito');
        funcionParaMostarLaTabla(true);
        funcionParaAgregarUnVehiculo([
            ...listaVehiculos,
            {nombre:nombre, marca:marca, modelo:modelo}]);
    };
    return(
    <div className='flex flex-col items-center justify-center'>
        <h2  className='text-2xl font-extrabold text-gray-700'>Crear nuevo vehículo</h2>
        <form className='flex flex-col'>
            <label className='flex flex-col' htmlFor='nombre'>
                Nombre del vehículo
            <input
            name='nombre' 
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
            type="text"
            value={nombre}
            onChange={(e)=>{setNombre(e.target.value)}}
            />
            </label>
            <label className='flex flex-col' htmlFor='marca'>
                Marca del vehículo
                <select name="marca"
                 value={marca}
                 onChange={(e)=>{setMarca(e.target.value)}}
                className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'>
                    <option disabled>Seleccione una opción</option>
                    <option>Renault</option>
                    <option>Toyota</option>
                    <option>Ford</option>
                    <option>Mazda</option>
                    <option>Chevrolet</option>
                </select>
            </label>
            <label className='flex flex-col' htmlFor='modelo'>
                Modelo del vehículo
            <input
             value={modelo}
             onChange={(e)=>{setModelo(e.target.value)}}
            name='modelo' 
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2' 
            type="number"
            min={1992}
            max={2014}
            placeholder='2020'/>
            </label>
            
            <button 
            type='button'
            className='col-span-2 bg-green-500 p-2 rounded-full shadow-md hover:bg-green-700 text-white'
            onClick={()=>{
                enviarAlBackend();
            }}
            >
                Guardar vehículo
            </button>
        </form>
    </div>
    );
}

export default Vehiculos;
