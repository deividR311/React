import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Tests from './components/Tests';
import MyComponent from './components/MyComponent';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Form from './components/Form';
import Article from './components/Article';
import Search from './components/Search';
import CreateArticle from './components/CreateArticle';
import EditArticle from './components/EditArticle';

class Router extends Component {

    render() {

        return (

            <BrowserRouter>

                <Header />

                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/home" activeClassName="active" component={ Home } />
                        <Route exact path="/blog" activeClassName="active" component={ Blog } />
                        <Route exact path="/blog/create" activeClassName="active" component={ CreateArticle } />
                        <Route exact path="/blog/update/:id" activeClassName="active" component={ EditArticle } />
                        <Route exact path="/blog/article/:id" activeClassName="active" component={ Article } />
                        <Route exact path="/blog/search/:search" activeClassName="active" component={ Search } />
                        <Route exact path="/redirect/:search" render={
                            ( props ) => {
                                var search = props.match.params.search;
                                return (
                                    <Redirect to={ '/blog/search/' + search } />
                                );
                            }
                        } />
                        <Route exact path="/form" activeClassName="active" component={ Form } />
                        <Route exact path="/movies" activeClassName="active" component={ Peliculas } />


                        <Route exact path="/test" activeClassName="active" component={ Tests } />
                        <Route exact path="/second" activeClassName="active" component={ MyComponent } />
                        

                        {/* ruta sin componente */}
                        <Route exact path="/page1" render={ () => (

                            <h1>hi world since page 1</h1>

                        )} />

                        <Route exact path="/test1/:nombre/:apellidos" render={ (props) => {

                                var nombre = props.match.params.nombre;
                                var apellidos = props.match.params.apellidos;

                                return(

                                    <div>
                                    <h1>Test 1 page</h1>
                                    <h2>
                                        { nombre && !apellidos &&
                                            <span>{ nombre }</span>
                                        }
                                        { apellidos && !nombre &&
                                            <span>{ apellidos }</span>
                                        }
                                        { apellidos && nombre &&
                                            <span>{ nombre } { apellidos }</span>
                                        }

                                    </h2>
                                    </div>

                                );

                            }
                        } />

                        <Route component={ Error } />
                    </Switch>
                    <div className="clearfix"></div>
                <Footer />
            </BrowserRouter>
        
        );

    }

       
  
}

export default Router;