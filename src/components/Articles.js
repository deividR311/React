import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../components/Global';
import noImage from '../assets/images/noImage.png';
import Moment from 'react-moment';
import 'moment/locale/es';

class Articles extends Component {

    url = Global.URL;
    state = {
        articles: [],
        status: null
    }

    componentWillMount() {

        var home = this.props.home;
        var search = this.props.search;

        if ( home === true ) {
            this.getLastArticles();
        } else if ( search ) {
            this.getArticlesBySearch( search );
        } else {
            this.getArticles();
        }

    }

    getArticlesBySearch = ( search ) => {

        axios.get(this.url + 'search/' + search)
            .then( res => {

                this.setState({
                    articles: res.data.articles,
                    status: true
                })

                console.log( this.state );

            }).catch( err => {

                this.setState({
                    articles: [],
                    status: true
                })

            })
    }

    getLastArticles = () => {

        axios.get(this.url + 'articles/last')
            .then( res => {

                this.setState({
                    articles: res.data.articles,
                    status: true
                })

            });
    }

    getArticles = () => {

        axios.get(this.url + 'articles')
            .then(res => {

                this.setState({
                    articles: res.data.articles,
                    status: true
                })

            });
    }

    render() {

        if (this.state.articles.length >= 1) {

            var listArticles = this.state.articles.map(article => {

                return (

                    <article key={article._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {article.image !== null ? (
                                <img src={this.url + '/get-image/' + article.image} alt={article.title} />
                            ) : (
                                    <img src={noImage} alt='noimage' />
                                )
                            }

                        </div>

                        <h2>{article.title}</h2>
                        <span className="date">
                            <Moment fromNow>{article.date}</Moment>
                        </span>
                        <Link to={ '/blog/article/' + article._id }>Leer más</Link>

                        <div className="clearfix"></div>
                    </article>

                );

            })

            return (
                <div id="articles">
                    { listArticles }
                </div>
            );

        } else if (this.state.articles.length === 0 && this.state.status === true) {

            return (
                <div id="articles">
                    <h1 className="subHeader">
                        NO HAY ARTICULOS PARA MOSTRAR
                    </h1>
                    <p>No hay contenido para mostrar</p>
                </div>
            );

        } else {

            return (
                <div id="articles">
                    <h1 className="subHeader">
                        CARGANDO...
                    </h1>
                    <p>Espere un momento mientras carga la información</p>
                </div>
            );

        }

    }

}

export default Articles;