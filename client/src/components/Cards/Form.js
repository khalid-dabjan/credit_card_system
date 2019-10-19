import React, {Component} from 'react';
import axios from 'axios';

class Form extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     errors: []
        // };
        this.state = {
            form: {
                name: '',
                cardNumber: '',
                limit: ''
            },
            errors: []
        };
    }

    handleChange = (event) => {
        this.setState({form: {...this.state.form, [event.target.name]: event.target.value}, errors: []});
    }

    submit = () => {
        axios.post('http://localhost:3001/api/cards', this.state.form).then(response => {
            this.props.onCardAdded();
            this.setState({
                form: {
                    name: '',
                    cardNumber: '',
                    limit: ''
                },
                errors: []
            });
        }).catch(error => {
            this.setState({errors: error.response.data.errors});
        });
    }

    render() {
        return (
            <div className="py-2">
                <h3 className="text-2xl py-2">Add</h3>
                <form className="w-full md:w-1/2 lg:w-1/3">
                    {
                        this.state.errors.length !== 0 &&
                        <div className="bg-red-300 py-2 px-1 rounded">
                            {this.state.errors.map(error => {
                                return (<div className="py-1">{error.msg}</div>);
                            })}
                        </div>
                    }
                    <div className="py-2">
                        <label className="text-sm" htmlFor="name">Name</label>
                        <input className="input w-full" name="name" type="text" value={this.state.form.name || ''}
                               onChange={this.handleChange} id="name"/>
                    </div>

                    <div className="py-2">
                        <label className="text-sm" htmlFor="card_number">Card Number</label>
                        <input className="input w-full" name="cardNumber" type="text"
                               value={this.state.form.cardNumber || ''}
                               onChange={this.handleChange} id="card_number"/>
                    </div>

                    <div className="py-2">
                        <label className="text-sm" htmlFor="limit">Limit</label>
                        <input className="input w-full" name="limit" type="text" value={this.state.form.limit || ''}
                               onChange={this.handleChange} id="limit"/>
                    </div>
                </form>

                <div className="py-4">
                    <button onClick={() => this.submit()} className="btn hover:underline">Add</button>
                </div>
            </div>
        );
    }
}

export default Form;
