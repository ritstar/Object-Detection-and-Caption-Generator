import React, { Component } from 'react';

class ShowObjectCount extends Component {
    render() {
        const objs = this.props.store;
        let names = [], quantis = [];
        for (var item in objs) {
            names.push(item);
            quantis.push(objs[item]);
        }
        return (
            <div style={{ marginTop: '20px' }}>
                <p style={{
                    color: 'black',
                    fontFamily: 'Orbitron',
                    textAlign: 'center',
                    fontSize: '30pt'
                }}>Object Details</p><br />

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Object Names</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(objs).map(([key, value]) =>
                            (
                                <tr>
                                    <td>{key}</td>
                                    <td>{value.toString()}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ShowObjectCount;