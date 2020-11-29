import React, { Component } from "react";
import axios from "axios";
import * as ROUTES from '../../constants/routes';
axios.defaults.baseURL = "http://localhost:5000";

export default class RemoveBook extends Component {
    constructor() {
        super();
        this.state = {
            favebooks: "",
            bookname: "",
            bookErr: ""
        };
    }

    handleChange = (event) => {
        this.setState({ 
            bookname: event.target.value 
        });
    }

    keyPressUser(e) {
        var deleteBook = this.state.bookname;
        this.setState({
            bookname: ""
        });

        //Delete the book from the users favorite movie database
        axios.get("/getBookId", { params: {booktitle: deleteBook}}).then(response => {
            if (response.data.length== 0) {
                this.setState({
                    bookErr: "Book does not exist."
                });
            }
            else {

                var bookid = response.data[0].book_id;
                console.log(bookid);

                axios.post("/removefavebook", {
                    bookid: bookid,
                    user_id: localStorage.getItem("currId")
                }).then(response => {
                    console.log("Deleted from favorites");
                    window.location.href = ROUTES.REMOVE_FAV_BOOKS;
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
                <h1>Delete Favorite Books</h1>
                <br></br>
                <br></br>

                <h2>Favorite Books: </h2>
                <p>{this.state.favebooks}</p>
                <br></br>
                <input
                    name="tag"
                    type="text"
                    placeholder="Enter the book title to delete..."
                    style={{ width: "300px" }}
                    value={this.state.bookname}
                    onChange={this.handleChange}
                />
                <br></br>
                <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
                    Delete!
                </button>

                <p className="text-danger">{this.state.bookErr}</p>

                <br></br>
                <br />
            </div>
        );
    }
}