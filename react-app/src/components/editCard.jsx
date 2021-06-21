import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

class EditCard extends Form {
    state = {
        data: {
            bizName: "",
            bizDescription: "",
            bizAddress: "",
            bizPhone: "",
            bizImage: ""
        },
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        bizName: Joi.string()
            .min(2)
            .max(255)
            .required(),
        bizDescription: Joi.string()
            .min(2)
            .max(1024)
            .required(),
        bizAddress: Joi.string()
            .min(2)
            .max(400)
            .required(),
        bizPhone: Joi.string()
            .min(9)
            .max(10)
            .required()
            .regex(/^0[2-9]\d{7,8}$/),
        bizImage: Joi.string()
            .min(11)
            .max(1024)
            .uri()
            .allow("")
    };

    async componentDidMount() {
        const cardId = this.props.match.params.id;
        const { data } = await cardService.getCard(cardId);
        this.setState({ data: this.mapToVievModel(data) })
    };
    mapToVievModel(card) {
        return {
            _id: card._id,
            bizName: card.bizName,
            bizDescription: card.bizDescription,
            bizAddress: card.bizAddress,
            bizPhone: card.bizPhone,
            bizImage: card.bizImage
        }
    }
    handleCancel = () => {
        this.props.history.push("/my-cards")
    }
    doSubmit = async () => {
        const { data } = this.state;
        await cardService.editCard(data);
        toast("Card updated successfully!")
        this.props.history.replace("/my-cards")
    }
    render() {
        return (
            (<div className="container">
                <PageHeader titleText="Edit Card Form" />
                <div className="row">
                    <div className="col-12">
                        <p>Here you can edit card details... </p>

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
                            {this.renderButton("Update Card")}
                            <button onClick={this.handleCancel} className="btn btn-secondary ms-2 mt-3">Cancel</button>


                        </form>

                    </div>
                </div>
            </div>)
        );
    }
}

export default EditCard;