import React, { Component } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

export default class RemoveBook extends Component {
    constructor() {
        super();
        this.state = {
            favebooks: "",
            favemovies: "",
            bookname: "",
            bookErr: ""
        };
    }

    handleChange = (event) => {
        this.setState({ 
            movieName: event.target.value 
        });
    }

    keyPressUser(e) {
        var deleteBook = this.state.bookname;
        console.log("The book that is going to be deleted is: " + deleteBook);
        this.setState({
            bookname: ""
        });

        //Delete the book from the users favorite book database
        axios.get("/checkBookExists", { params: {toMatch: deleteBook}}).then(response => {
            const input = response.data.map((d) => <li key={d.book_title}>{d.book_title} </li>);

            if(input.length==0) {
                this.setState({
                    bookErr: "Book does not exist."
                });
            }
            else {
                axios.post("/removefavebooks", {
                    bookName: deleteBook
                }).then(response => {
                    console.log("Deleted from favorites");
                    this.setState({
                        movieErr: "Book deleted."
                    });
                })
            }
          });
        
    }

    componentDidMount() {
        axios.get("/getFaveBooks", {params: {userid: localStorage.getItem("currId")}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
            this.setState({
                favebooks: listItems
            });
        })

    };

    render() {
        return (
            <div>
                <h2>Favorite Books: </h2>
                <p>{this.state.favebooks}</p>
                <h2>Enter the book you want to delete</h2>
                <br></br>

                <input
                    name="tag"
                    type="text"
                    placeholder="Enter the book name that you would like to delete"
                    style={{ width: "300px" }}
                    value={this.state.bookname}
                    onChange={this.handleChange}
                />
                <br></br>
                <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
                    Delete!
        </button>

                <br></br>
                <br />
            </div>
        );
    }
}