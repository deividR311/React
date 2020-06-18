import React, { Component } from 'react';
import Sidebar from './Sidebar';

class Form extends Component {

    nameRef = React.createRef();
    lastNameRef = React.createRef();
    bioRef = React.createRef();
    maleRef = React.createRef();
    femaleRef = React.createRef();
    otherRef = React.createRef();

    state = {

        user: {}

    }

    recibirForulario = ( e ) => {

        //para que no se actualice la pantalla sin aplicar la logica de este metodo
        e.preventDefault();

        var genero = '';

        if ( this.maleRef.current.checked ) {

            genero = this.maleRef.current.value

        } else if ( this.femaleRef.current.checked ) {

            genero = this.femaleRef.current.value

        } else if ( this.otherRef.current.checked ) {

            genero = this.otherRef.current.value

        }

        var user = {

            nombre: this.nameRef.current.value,
            apellidos: this.lastNameRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero

        }

        this.setState({
            user: user
        })

        console.log( user );
    }

    render() {

        if ( this.state.user.nombre ) {
            var user = this.state.user;
        }

        return(
            <div>
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">formulario</h1>

                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p> Nombre: <strong>{ user.nombre }</strong> </p>
                                <p> Apellido: <strong>{ user.apellidos }</strong> </p>
                                <p> Bio: <strong>{ user.bio }</strong> </p>
                                <p> Genero: <strong>{ user.genero }</strong> </p>
                            </div>
                        }

                        {/* formulario */}
                        <form className="mid-form" onSubmit={this.recibirForulario} onChange={this.recibirForulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.lastNameRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.bioRef} ></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.maleRef} /> Hombre 
                                <input type="radio" name="genero" value="mujer" ref={this.femaleRef} /> Mujer 
                                <input type="radio" name="genero" value="otro" ref={this.otherRef} /> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>

                    </div>
                    <Sidebar blog={false} />
                </div>
            </div>
        );

    }

}

export default Form;