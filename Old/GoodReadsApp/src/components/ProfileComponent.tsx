import React, { Component, Dispatch, FormEvent } from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { RouteProps, RouteComponentProps } from "react-router";
import { User } from "../models/User";
import "../style/ProfileComponent.css"


interface Props {
    match?: Object;
}

interface State {
    user_id: string;
    user?: User;
    reviewsGiven?:number;
    ratingsGiven?:number;
}

class ProfileComponent extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = { user_id: " " };
    }

    componentDidMount = () => {
        const id = ((this.props.match as any).params.user_id);
        this.setState({
            user_id: id
        });
        fetch("http://localhost:3002/users/" + id)
            .then(res => res.json())
            .then(userTmp => {
                this.setState({ user: userTmp });
        })

        fetch("http://localhost:3002/userHasReview")
            .then(res => res.json())
            .then(nizUserReviewa => {
                let numberOfReviews=nizUserReviewa.reduce((acc,el)=>{
                    if(el.userId===id){
                        acc+=1;
                    }
                    return acc;
                },0)
                this.setState({ reviewsGiven: numberOfReviews });
        })

        fetch("http://localhost:3002/ratingHasUser")
            .then(res => res.json())
            .then(arrayUserRatinga => {
                let numberOfRatings=arrayUserRatinga.reduce((acc,el)=>{
                    if(el.userId===id){
                        acc+=1;
                    }
                    return acc;
                },0)
                this.setState({ ratingsGiven: numberOfRatings });
        })

        //userHasReview
        //ratingHasUser

    }

    render() {
        if (!this.state.user) {
            return (<h4>Loading...</h4>)
        }
        else {
            return (
                <div className="user-profile">
                    <h1>Welcome {this.state.user.name}</h1>
                    <label>Details: {this.state.user.city}, {this.state.user.country}</label>
                    <label>Activity: {this.state.user.joined}</label>
                    <label>Ratings given: {this.state.ratingsGiven}</label>
                    <label>Reviews given: {this.state.reviewsGiven}</label>
                    <h3>Bookshelves</h3>
                    <label>Want to read</label>
                    <label>Currently reading</label>
                    <label>Read</label>
                </div>
            )
        }
    }
}

export default ProfileComponent;

