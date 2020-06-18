import React, { Component } from 'react';
import MyComponent from './MyComponent';

class Tests extends Component {

    contador = 0;

    constructor( props ) {

        super( props );
        this.state = {
            contador: 0
        }

    }

    render() {

        return (
            <section id="content">
                <p>
                    { this.props.title }
                </p>
                { this.presentacion('David', 12) }
                <p>
                    Componentes
                </p>
                <MyComponent></MyComponent>
                <h2>{ this.props.state }</h2>
                <p>
                    contador: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="sum" onClick={ this.sum.bind(this) }></input>
                    <input type="button" value="sum" onClick={ this.res.bind(this) }></input>
                </p>

            </section>
        )

    }

    sum() {

        this.setState({
            contador: (this.state.contador + 1)
        })

    }

    res() {

        this.setState({
            contador: (this.state.contador - 1)
        })
        
    }

    presentacion( nombre, edad ) {

        var presentacion = (<div>
                              <h1>Hola, soy { nombre }</h1>
                              <h2>Tengo { edad } años</h2>
                           </div>)
        return presentacion;
      }

}

export default Tests;