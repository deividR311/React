import React, {Component} from 'react';

class MyComponent extends Component {

    render() {

        let receta = {
            nombre: 'pizza',
            ingredientes: ['sal', 'mermelada', 'masa', 'colores'],
            calorias: 400
        }

        return(

            <div>
                <h1>Soy el componente primero</h1>
                <h1>Soy el componente</h1>
                <ol>
                    {
                        receta.ingredientes.map( (ingrediente, i) => {

                            return (
                                <li key={ i }>
                                    { ingrediente }
                                </li>
                            )
                        })
                    }
                </ol>
            </div>

        )

    }

}

export default MyComponent;