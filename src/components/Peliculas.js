import React, { Component } from 'react';
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {

    state = {
        peliculas: [
            { title: 'Batman vs Superman', image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hobbyconsolas.com%2Freportajes%2Fbatman-v-superman-nuevo-que-anade-ultimate-edition-60948&psig=AOvVaw2Ha8EmEEBLGIjbc2MNlTog&ust=1591560259491000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjPy5P-7ekCFQAAAAAdAAAAABAD" },
            { title: 'focus', image: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.sensacine.com%2Fpeliculas%2Fpelicula-206559%2F&psig=AOvVaw0C2vErhqDO3v7OQ28wm06H&ust=1591560313889000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCODvrKz-7ekCFQAAAAAdAAAAABAD' },
            { title: 'avatar', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.abc.es%2Fplay%2Fcine%2Fnoticias%2Fabci-comienza-rodaje-secuela-avatar-estrenara-once-anos-despues-cinta-original-201709281033_noticia.html&psig=AOvVaw3f7JC0qiEXx4I_rVyW0VuN&ust=1591560346313000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiTmLz-7ekCFQAAAAAdAAAAABAD' }
        ],
        nombre: 'David Rodriguez',
        favorite: {}
    }

    changeTitle = () => {

        var { peliculas } = this.state;
        peliculas[0].title = 'Batman Begin';
        this.setState({
            peliculas: peliculas
        })

    }

    favoriteMovie = (pelicula) => {

        console.log('Favorite Movie');
        console.log(pelicula);
        this.setState({
            favorite: pelicula
        })

    }

    render() {

        var pStyle = {

            background: 'green',
            color: 'white',
            padding: '10px'

        }

        var favorite;

        if (this.state.favorite.title) {

            favorite = (
                <p className='favorite' style={pStyle}>
                    <strong>La pelicula Favorita es: </strong>
                    <span>{this.state.favorite.title}</span>
                </p>
            )

        } else {

            favorite = <p>No hay peliculas favoritas</p>

        }

        return (

            <React.Fragment>
                <Slider title='Blog'
                    btn={false}
                    size="slider-small" />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subHeader">Peliculas</h2>
                        <p>
                            Seleccion de las peliculas favoritas de {this.state.nombre}
                        </p>
                        <p>
                            <button onClick={this.changeTitle}>Change name</button>
                        </p>
                        {

                            favorite
                            // this.state.favorite.title ? (

                            //         <p className='favorite' style={ pStyle }>
                            //         <strong>La pelicula Favorita es: </strong>
                            //         <span>{ this.state.favorite.title }</span>
                            //         </p>

                            //     ) : (

                            //         <p>No hay peliculas favoritas</p>

                            //     )

                        }


                        <div id="articles" className="peliculas">
                            {

                                this.state.peliculas.map((pelicula, i) => {

                                    return (

                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            favorite={this.favoriteMovie}
                                        />

                                    )

                                })

                            }
                        </div>
                    </div>
                    <Sidebar blog={true} />
                </div>
            </React.Fragment>
        );

    }

}

export default Peliculas;