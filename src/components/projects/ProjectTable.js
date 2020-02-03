import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import ProjectLinks from '../layout/ProjectLinks'

class ProjectTable extends Component {
    render(){
        console.log(this.props)
        const { projects, auth, match } = this.props;

        if(!auth.uid) return <Redirect to='/signin' />
        return (
            <>
                <nav className="nav-extended grey">
                    <div className="container">
                        <h5 className="center">Projects</h5>
                        <ProjectLinks cid={match.params.id} />  
                    </div>
                </nav>
                <div className="dashboard container">
                    <table className="highlight">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Address</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <ProjectList projects={projects} cid={match.params.id} />
                    </table>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        //projects: state.project.projects
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth

    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']}
    ])
)(ProjectTable)