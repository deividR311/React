import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {

        return (

            <header id="header">
                <div className="center">
                    <div id="logo">
                        <img src={ logo } className="app-logo" alt="Logotipo" />
                        <span id="brand">
                            <strong>Curso</strong>React
                    </span>
                    </div>
                    <nav id="menu">
                        <ul>
                            <li>
                                <NavLink to='/home'>Inicio</NavLink>
                            </li>
                            <li>
                                <NavLink to='/blog'>Blog</NavLink>
                            </li>
                            {/* <li>
                                <NavLink to='/form'>Formulario</NavLink>
                            </li> */}
                            <li>
                                <NavLink to='/movies'>Peliculas</NavLink>
                            </li>
                            {/* <li>
                                <NavLink to='/'>Pagina 2</NavLink>
                            </li> */}
                        </ul>
                    </nav>
                    <div className="clearfix"></div>
                </div>
            </header>

        )

    }

}

export default Header;