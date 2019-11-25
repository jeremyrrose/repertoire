import React from 'react';
import { UserBadge } from '../components';
import { Redirect } from 'react-router-dom';
import '../styles/Browse.css';

export class Browse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            browseList: [],
            browseNumber: 3,
            userKeys: []
        }
    }

    getBrowseList = () => {
        if (this.props.userKeys[0]) {
            const keys = [ ...this.props.userKeys ];
            let browseList = [];
            while (browseList.length < this.state.browseNumber) {
                let item = keys.splice(Math.floor(Math.random() * keys.length-1),1)[0];
                browseList.push(item);
            }
            this.setState({ browseList: browseList });
        }
    }

    render() {
        this.state.browseList[0] || this.getBrowseList();
        const browseList = this.state.browseList;
        const badges = browseList.map(user => <UserBadge name={this.props.data[user].first + ' ' + this.props.data[user].last} avatar={this.props.data[user].avatar} cityState={this.props.data[user].city + ', ' + this.props.data[user].state} user={user} />);

        return <main class="browse">{badges}</main>;
    }

}