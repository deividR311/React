import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from './Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2';
import noImage from '../assets/images/noImage.png';

class EditArticle extends Component {

    url = Global.URL;
    titleRef = React.createRef();
    contentRef = React.createRef();
    fileRef = React.createRef();

    state = {
        article: {},
        fileSelected: null,
        status: false
    };

    componentWillMount() {

        var articleId = this.props.match.params.id;

        if ( articleId ) {
            this.getArticleById( articleId );
        }
        this.validator = new SimpleReactValidator({
            messages: {
              required: 'this date is required'
            }
          });
    }

    getArticleById = (idArticle) => {

        axios.get(this.url + 'article/' + idArticle)
            .then(res => {

                this.setState({
                    article: res.data.article,
                    status: 'success'
                })

                console.log(this.state);

            });
    }

    changeState = () => {

        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();

    }

    updateArticle = (e) => {

        e.preventDefault();
        this.changeState();

        if ( this.validator.allValid() ) {

            axios.put(this.url + 'article/' + this.props.match.params.id, this.state.article)
                .then(res => {

                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        })

                        Swal.fire(
                            'Articulo Editado!',
                            'Articulo Editado exitosamente',
                            'success'
                        )

                        if (this.state.fileSelected !== null) {

                            var articleId = this.state.article._id;

                            const formData = new FormData();

                            formData.append(
                                'image',
                                this.state.fileSelected,
                                this.state.fileSelected.name
                            );

                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    console.log(res);
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: true
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: false
                                        });
                                    }

                                });

                        } else {
                            this.setState({
                                status: true
                            })
                        }
                    } else {
                        this.setState({
                            status: false
                        })
                    }

                }).catch(err => {

                    console.log(err);
                    this.setState({
                        article: {},
                        status: false
                    })

                })
        } else {

            this.setState({
                status: false
            })
            this.validator.showMessages();
            this.forceUpdate();

        }

    }

    changeFile = (event) => {

        this.setState({
            fileSelected: event.target.files[0]
        })
        console.log(this.state);

    }

    render() {

        if (this.state.status === true) {

            return (
                <Redirect to="/blog"></Redirect>
            );

        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar Articulo</h1>

                    {this.state.status === 'success' &&

                        <form className="mid-form" onSubmit={this.updateArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" defaultValue={ article.title }  ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea type="text" name="content" defaultValue={ article.content } ref={this.contentRef} onChange={this.changeState} />
                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Imagen</label>
                            <input type="file" name="file" ref={this.fileRef} onChange={this.changeFile} />
                            <div className="image-wrap">
                                {this.state.article.image !== null ? (
                                    <img src={this.url + '/get-image/' + article.image} className='image-edit' alt={this.state.article.title} />
                                ) : (
                                        <img src={noImage} className='image-edit' alt='noimage' />
                                    )
                                }
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>

                    }

                    {this.state.status !== 'success' &&
                        <h1>Cargando...</h1>
                    }
                    
                </section>
                <Sidebar />
            </div>
        );

    }

}

export default EditArticle;