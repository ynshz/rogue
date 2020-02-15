import React, { Component } from 'react'
import { Header, Icon, Menu, Sidebar, Dropdown } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Route, Link, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase/app'

class Invoices extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.AddtoFirestore = this.AddtoFirestore.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          invoiceID: "",
          invoiceLink: "",
          invoiceName: "",
          invoiceType: "",
          invoiceUploadDate: firebase.firestore.Timestamp.fromDate(new Date()),
          projectID: "",
          userID: ""
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
    AddtoFirestore() {
    const firestore = firebase.firestore();
    console.log(this.state.invoiceLink);
    firestore
        .collection("Invoice")
        .add({
        invoiceID: this.state.invoiceID,
        invoiceLink: this.state.invoiceLink,
        invoiceName: this.state.invoiceName,
        invoiceType: this.state.invoiceType,
        invoiceUploadDate: this.state.invoiceUploadDate,
        projectID: this.state.projectID,
        userID: this.state.userID
        })
        .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
        })
        .catch(function(error) {
        console.error("Error add document:", error);
        });
    }
    //auth.isLoaded waiting for Auth Ready so the links don't flash
    render() {
        let lableOuput;
        if (this.state.registrationStatus == "Success") {
            lableOuput = <lable>Successfully add new file to the Drive</lable>;
        } else {
            lableOuput = <lable>{this.state.registrationStatus}</lable>;
        }
        return(
            <div id="InvoiceAdd-div" className="main-div">
            <h1>Add invoice</h1>
            {/* invoiceID field */}
            <input
            value={this.state.invoiceID}
            onChange={this.handleChange}
            type="text"
            name="invoiceID"
            placeholder="invoiceID"
            id="invoiceID-field"
            />
            {/* invoiceLink field */}
            <input
            value={this.state.invoiceLink}
            onChange={this.handleChange}
            type="text"
            name="invoiceLink"
            placeholder="invoiceLink"
            id="invoiceLink-field"
            />
            {/* invoiceName field */}
            <input
            value={this.state.invoiceName}
            onChange={this.handleChange}
            type="text"
            name="invoiceName"
            placeholder="invoiceName"
            id="invoiceName-field"
            />
            {/* invoiceType field */}
            <input
            value={this.state.invoiceType}
            onChange={this.handleChange}
            type="text"
            name="invoiceType"
            placeholder="invoiceType"
            id="invoiceType-field"
            />

            {lableOuput}
            <button onClick={this.AddtoFirestore}>Add to invoice list</button>
        </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}
export default withRouter(compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'projects', orderBy: ['title']}
    ])
)(Invoices))