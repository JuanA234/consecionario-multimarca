import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='bg-red-400'>
            <ul className='flex w-full justify-between my-3'>
                <li>Logo</li>
                <li>Navegacion1</li>
                <li>Navegacion2</li>
                <li>Navegacion3</li>
                <li className='px-3'>
                    <Link to='/login'>
                    <button className='bg-indigo-500 p-2 text-white rounded-lg hover:bg-indigo-700'>Iniciar sesión</button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;
