import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Sidebar extends Component {

    searchRef = React.createRef();

    state = {
        search: '',
        reDirect: false
    }

    redirectToSearch = ( e ) => {

        e.preventDefault();
        this.setState({
            search: this.searchRef.current.value,
            reDirect: true
        })

    }

    render() {

        if ( this.state.reDirect === true ) {

            return (
                <Redirect to={ '/redirect/' + this.state.search } />
            );

        }

        return(
            <aside id="sidebar">
                { this.props.blog === true &&

                    <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <Link to={ '/blog/create' } className="btn btn success">Crear artículo</Link>
                    </div>

                }

                <div id="search" className="sidebar-item">
                        <h3>Buscador</h3>
                        <p>Encuentra el artículo que buscas</p>
                        <form onSubmit={ this.redirectToSearch }>
                            <input type="text" name="search" ref={this.searchRef} />
                            <input type="submit" name="submit" value="Buscar" className="btn" />
                        </form>
                </div>
            </aside>
        )

    }

}

export default Sidebar;