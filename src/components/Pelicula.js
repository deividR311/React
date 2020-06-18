import React, { Component } from 'react';

class Pelicula extends Component {

    marcar = () => {

        this.props.favorite(this.props.pelicula);
    }

    render() {

        const { title, image } = this.props.pelicula;

        return (
            
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={ image } alt={ title } />
                </div>

                <h2>{ title }</h2>
                <span className="date">
                    Hace 5 minutos
                </span>
                <button onClick={ this.marcar }>
                    Mark Favorite
                </button>

                <div className="clearfix"></div>
            </article>

        )

    }

}

export default Pelicula;