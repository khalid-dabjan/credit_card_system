import React, {Component} from 'react';
import axios from 'axios';

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initializing: true
        }
    };


    render() {
        return (
            <div className="py-2">
                <h3 className="text-2xl py-2">Existing Cards</h3>

                <div>
                    {this.props.cards.length === 0 ?
                        (
                            <div className="py-6 px-3 text-center">
                                No cards were found
                            </div>
                        ) : (
                            <table className="text-left w-full">
                                <thead className="bg-gray-400 flex text-black w-full">
                                <tr className="flex w-full border-t border-b border-black">
                                    <th className="p-4 w-1/4 text-center border-r border-black">Name</th>
                                    <th className="p-4 w-1/4 text-center border-r border-black">Card Number</th>
                                    <th className="p-4 w-1/4 text-center border-r border-black">Balance</th>
                                    <th className="p-4 w-1/4 text-center border-r border-black">Limit</th>
                                </tr>
                                </thead>

                                <tbody
                                    className=" flex flex-col items-center justify-between overflow-y-scroll w-full">
                                {this.props.cards.map(card => (
                                    <tr key={card._id} className="flex w-full border-b border-black">
                                        <td className="p-4 w-1/4 text-center border-r border-black">{card.name}</td>
                                        <td className="p-4 w-1/4 text-center border-r border-black">{card.cardNumber}</td>
                                        <td className="p-4 w-1/4 text-center border-r border-black">{card.balance || 0}</td>
                                        <td className="p-4 w-1/4 text-center border-r border-black">{card.limit}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}
                </div>
            </div>
        );
    }
}

export default Listing;
