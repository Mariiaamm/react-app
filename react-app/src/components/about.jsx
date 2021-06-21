import React, { Component } from 'react';
import PageHeader from './common/pageHeader';

class About extends Component {
    state = {}
    render() {
        return (<div className="container">
            <PageHeader titleText="About react app..." />

            <div className="row">
                <div className="col-12">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam blanditiis temporibus sit?
                        </p>
                </div>
            </div>

        </div>);
    }
}

export default About;