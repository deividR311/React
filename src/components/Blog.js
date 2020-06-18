import React, {Component} from 'react';
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Blog extends Component {

    render() {

        return(
            <div>
                <Slider title='Blog'
                        btn={false}
                        size="slider-small"/>
                <div className="center">
                    <div id="content">

                        {/* listado articulos que vendran del api rest de node */}
                        <Articles />

                    </div>
                    <Sidebar blog={true} />
                </div>
            </div>
        );

    }

}

export default Blog;