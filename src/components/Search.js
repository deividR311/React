import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    render() {

        //recoger el valor por parametro
        var searched = this.props.match.params.search;

        return(
            <div>
                <Slider title={ 'Busqueda: ' + searched}
                        btn={false}
                        size="slider-small"/>
                <div className="center">
                    <div id="content">

                        {/* listado articulos que vendran del api rest de node */}
                        <Articles 
                            search={ searched }
                            />

                    </div>
                    <Sidebar blog={true} />
                </div>
            </div>
        );

    }

}

export default Blog;