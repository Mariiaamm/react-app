import React from 'react';
import PageHeader from './common/pageHeader';
import Joi from 'joi-browser';
import Form from './common/form';
import cardService from '../services/cardService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

class CreateCard extends Form {
    state = {
        data: {
            bizName: "",
            bizDescription: "",
            bizAddress: "",
            bizPhone: "",
            bizImage: ""
        },
        errors: {}
    }
    schema = {
        bizName: Joi.string().min(2).max(255).required(),
        bizDescription: Joi.string().min(2).max(1024).required(),
        bizAddress: Joi.string().min(2).max(400).required(),
        bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
        bizImage: Joi.string().min(11).max(1024).uri().allow("")
    }
    doSubmit = async () => {
        const data = { ...this.state.data };
        if (!data.bizImage) delete data.bizImage;
        await cardService.createCard(data);
        toast("A new card created!");
        this.props.history.replace("/my-cards")
    }
    render() {
        return (<div className="container">
            <PageHeader titleText="Business Registration Form" />
            <div className="row">
                <div className="col-12">
                    <p>Open Business card... <Link to="/my-cards" className="link-danger">Cancel</Link></p>

                </div>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">
                        {this.renderInput("bizName", "Business Name")}
                        {this.renderInput("bizDescription", "Business Description")}
                        {this.renderInput("bizAddress", "Business Address")}
                        {this.renderInput("bizPhone", "Business Phone", "tel")}
                        {this.renderInput("bizImage", "Business Image")}
                        {this.renderButton("Create Account")}

                    </form>

                </div>
            </div>
        </div>);
    }
}

export default CreateCard;