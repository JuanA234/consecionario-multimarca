import { nanoid } from 'nanoid';
import React, { useEffect, useState, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const vehiculosBackend = [
    {
        nombre: "Corolla",
        marca: "Toyota",
        modelo: 2014
    },
    {
        nombre: "Sandero",
        marca: "Renault",
        modelo: 2020
    },
    {
        nombre: "Rav4",
        marca: "Toyota",
        modelo: 2011
    },
    {
        nombre: "Fiesta",
        marca: "Ford",
        modelo: 2017
    },
    {
        nombre: "Mazda 3",
        marca: "Mazda",
        modelo: 2020
    },
    {
        nombre: "Chrevolet",
        marca: "Onix",
        modelo: 2021
    }

];

const Vehiculos = () => {

    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [vehiculos, setVehiculos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear nuevo vehículo');
    const [colorBoton, setColorBoton] = useState('indigo');

    useEffect(() => {
        //Obtener lista de vehículos desde el backend
        setVehiculos(vehiculosBackend);
    }, []);

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear nuevo vehículo');
            setColorBoton('indigo');
        }
        else {
            setTextoBoton('Mostrar todo');
            setColorBoton('blue');
        }
    }, [mostrarTabla]);

    return (
        <div className='flex h-full w-full flex-col items-center justify-start p-8'>
            <div className='flex flex-col w-full'>
                <h2 className='text-3xl font-extrabold text-gray-900'>Página de administración de vehículos</h2>
                <button onClick={() => {
                    setMostrarTabla(!mostrarTabla);
                }}
                    className={`text-white bg-${colorBoton}-500 p-4 rounded-full m-6 self-end`}>
                    {textoBoton}
                </button>
            </div>
            {mostrarTabla ? (<TablaVehiculos listaVehiculos={vehiculos} />)
                : (<FormularioCreacionVehiculos
                    setMostrarTabla={setMostrarTabla}
                    listaVehiculos={vehiculos}
                    setVehiculos={setVehiculos} />)}
            <ToastContainer position='bottom-center' autoClose={5000} />

        </div>
    );
};

const TablaVehiculos = ({ listaVehiculos }) => {
    return (
        <div className='flex flex-col items-center w-full justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-800'>Todos los vehículos</h2>
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Nombre del vehículo</th>
                        <th>Marca del vehículo</th>
                        <th>Modelo del vehículo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVehiculos.map((vehiculo) => {
                        return (
                            <FilaVehiculo key={nanoid()} vehiculo={vehiculo} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}


const FilaVehiculo = ({ vehiculo }) => {
    const [edit, setEdit] = useState(false);
    const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState({
        nombre: vehiculo.nombre,
        marca: vehiculo.marca,
        modelo : vehiculo.modelo,

    });
    const actualizarVehiculo = () => {
        console.log(infoNuevoVehiculo);
        // Enviar la info al backend 
    }

    const eliminarVehiculo = () => {
        
    }
    return (
        <tr>
            {edit ?
                <>
                    <td>
                        <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text" 
                        defaultValue={infoNuevoVehiculo.nombre}
                         onChange = {(e)=> 
                            setInfoNuevoVehiculo({...infoNuevoVehiculo, nombre: e.target.value})}
                         />
                    </td>
                    <td>
                        <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text" defaultValue={infoNuevoVehiculo.marca} 
                        onChange = {(e)=> 
                            setInfoNuevoVehiculo({...infoNuevoVehiculo, marca: e.target.value})}
                        />
                    </td>
                    <td>
                        <input className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text" 
                        defaultValue={infoNuevoVehiculo.modelo}
                        onChange = {(e)=> 
                            setInfoNuevoVehiculo({...infoNuevoVehiculo, modelo: e.target.value})}
                        />
                    </td>
                </>
                :
                <>
                    <td>{vehiculo.nombre}</td>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.modelo}</td>
                </>
            }
            <td>
                <div className='flex w-full justify-around'>
                    {edit ?
                    <i onClick={() => actualizarVehiculo()}  
                    className="fas fa-check text-green-600 hover:text-green-400"></i>
                   :

                    <i onClick={() => setEdit(!edit)} 
                    className="fas fa-pencil-alt hover:text-yellow-500 text-yellow-700"></i>}

                    <i 
                    onClick= {()=> eliminarVehiculo()}
                    className="fas fa-trash text-red-700 hover:text-red-500"></i>
                </div>
            </td>
        </tr>
    )
}

const FormularioCreacionVehiculos = ({ setVehiculos, listaVehiculos, setMostrarTabla }) => {
    const form = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoVehiculo = {};
        fd.forEach((value, key) => {
            nuevoVehiculo[key] = value;
        });
        setMostrarTabla(true);
        setVehiculos([...listaVehiculos, nuevoVehiculo]);
        //Identificar un caso de éxito y mostrar un toast de éxito
        toast.success("Vehículo agregado con éxito");
        //Identificar un caso de error y mostrar un toast de error
        //toast.error("Error agregando vehículo");


    };


    return (
        <div className='flex flex-col items-center justify-center'>
            <h2 className='text-2xl font-extrabold text-gray-700'>Crear nuevo vehículo</h2>
            <form ref={form} onSubmit={submitForm} className='flex flex-col'>
                <label className='flex flex-col' htmlFor='nombre'>
                    Nombre del vehículo
                    <input
                     name='nombre'
                        required
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="text"
                    />
                </label>
                <label className='flex flex-col' htmlFor='marca'>
                    Marca del vehículo
                    <select
                        name="marca"
                        required
                        defaultValue={0}
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'>
                        <option disabled value={0}>Seleccione una opción</option>
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
                     name='nombre'
                        className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
                        type="number"
                        required
                        min={1992}
                        placeholder='2020' />
                </label>

                <button
                    type='submit'
                    className='col-span-2 bg-green-500 p-2 rounded-full shadow-md hover:bg-green-700 text-white'
                >
                    Guardar vehículo
                </button>
            </form>
        </div>
    );
}

export default Vehiculos;
