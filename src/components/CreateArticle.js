import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from './Global';
import Sidebar from './Sidebar';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2';

class CreateArticle extends Component {

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
        this.validator = new SimpleReactValidator({
            messages: {
              required: 'this date is required'
            }
          });
    }

    changeState = () => {

        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });

        this.validator.showMessages();
        this.forceUpdate();

    }

    createArticle = (e) => {

        e.preventDefault();
        this.changeState();

        if ( this.validator.allValid() ) {

            axios.post(this.url + 'save', this.state.article)
                .then(res => {

                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        })

                        Swal.fire(
                            'Articulo creado!',
                            'Articulo creado exitosamente',
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
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Crear Articulo</h1>

                    <form className="mid-form" onSubmit={this.createArticle}>
                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea type="text" name="content" ref={this.contentRef} onChange={this.changeState} />
                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">Imagen</label>
                            <input type="file" name="file" ref={this.fileRef} onChange={this.changeFile} />
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>
                <Sidebar />
            </div>
        );

    }

}

export default CreateArticle;