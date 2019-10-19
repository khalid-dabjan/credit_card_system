import React, {Component} from 'react';
import Form from './components/Cards/Form';
import Listing from './components/Cards/Listing';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };
    }

    componentDidMount() {
        this.fetchCards();
    }

    fetchCards() {
        axios.get('http://localhost:3001/api/cards').then(response => {
            this.setState({cards: response.data});
        });
    }

    updateBalance() {

    }

    render() {

        return (

            <main>
                <h1 className="text-gray-800 text-3xl">Credit Card System</h1>

                <div>
                    <Form onCardAdded={() => this.fetchCards()}>
                    </Form>
                </div>

                <div>
                    <Listing cards={this.state.cards} onBalanceCange={() => this.updateBalance()}>
                    </Listing>
                </div>

            </main>
        );
    }
}

export default App;