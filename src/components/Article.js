import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Global from './Global';
import noImage from '../assets/images/noImage.png';
import 'moment/locale/es';
import Sidebar from './Sidebar';
import Moment from 'react-moment';
import Swal from 'sweetalert2';

class Article extends Component {

    url = Global.URL;
    state = {
        article: {},
        status: false
    }

    componentWillMount() {

        var id = this.props.match.params.id;

        if (id) {
            this.getArticleById(id);
        } else {
            this.ArticleNoExist();
        }

    }

    ArticleNoExist = () => {

        return (

            this.setState({
                article: {},
                status: false
            })
        )

    }

    getArticleById = (idArticle) => {

        axios.get(this.url + 'article/' + idArticle)
            .then(res => {

                this.setState({
                    article: res.data.article,
                    status: true
                })

            });
    }

    deleteArticle = () => {

        var idArticle = this.props.match.params.id;
        axios.delete( this.url + 'article/' + idArticle)
        .then( res => {

            this.setState({
                article: res.data.article,
                status: 'deleted'
            })
            
            Swal.fire(
                'Articulo Eliminado!',
                'Articulo Eliminado exitosamente',
                'success'
            )

            this.setState({
                status: true
            })        
            
        }).catch( err => {
            throw err;
        })

    }

    render() {

        if ( this.state.status === 'deleted' ) {
            return <Redirect to='/blog'></Redirect>
        }

        if ( this.state.status === true ) {

            return (

                <div className="center">
                    <section id="content">

                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {this.state.article.image !== null ? (
                                    <img src={this.url + '/get-image/' + this.state.article.image} alt={this.state.article.title} />
                                ) : (
                                        <img src={noImage} alt='sinimage' />
                                    )
                                }
                            </div>

                            <h1 className="subheader">{this.state.article.title}</h1>
                            <span className="date">
                                <Moment fromNow>{this.state.article.date}</Moment>
                            </span>
                            <p>
                                {this.state.article.content}
                            </p>

                            <button className="btn btn-danger" onClick={ this.deleteArticle }>Eliminar</button>
                            <Link to={'/blog/update/' + this.state.article._id } className="btn btn-warning">Editar</Link> 

                            <div className="clearfix"></div>
                        </article>

                    </section>

                    <Sidebar />
                </div>

            );
        }

        return (

            <div className="center">
                <h1 className="subHeader">
                    No hay articulo con ese ID</h1>
                <section id="content"></section>
                <Sidebar />
            </div>
        );

    }

}

export default Article;