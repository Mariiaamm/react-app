import React from 'react';
import { toast } from 'react-toastify';
import cardService from '../services/cardService';
import Form from './common/form';
import PageHeader from './common/pageHeader';

class DeleteCard extends Form {
    state = {}
    schema = {}
    doSubmit = async () => {
        const cardId = this.props.match.params.id;
        await cardService.deleteCard(cardId)
        toast("Card deleted successfully")
        this.props.history.replace("/my-cards")
    }
    handleCancel = () => {
        this.props.history.push("/my-cards")
    }
    render() {
        return (
            (<div className="container">
                <PageHeader titleText="Are you sure you want to delete this card?" />

                <div className="row">
                    <div className="col-lg-6">
                        <form onSubmit={this.handleSubmit} method="POST" autoComplete="off">

                            {this.renderButton("Delete Card", "danger")}
                            <button onClick={this.handleCancel} className="btn btn-secondary ms-2 mt-3">Cancel</button>


                        </form>

                    </div>
                </div>
            </div>)
        );
    }

}

export default DeleteCard;