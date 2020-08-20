import React from "react";
import API from "../../utils/API";
import {Link} from "react-router-dom";
import {PhonebookItem} from "../PhonebookItem/phonebookItem";
import {Button, Form, Table} from "react-bootstrap";
import {FaPlusCircle, FaSearch} from "react-icons/fa";

export class PhonebookList extends React.Component {
    state = {
        searchTerm: "",
        phonebooks: [],
    };

    componentDidMount = async () => {
        await API.fetchBySearch("")
            .then(async (response) => {
                await this.setState({phonebooks: response.data.phonebooks})
            }).catch(() => {
                window.flash("There has been a problem when fetching the phonebooks", "error");
            });
    }

    search = () => {
        const searchTerm = this.state.searchTerm;
        API.fetchBySearch(searchTerm)
            .then((response) => {
                this.setState({phonebooks: response.data.phonebooks});
            }).catch(() => {
                window.flash("No entry found", 'error');
            });
    };
    handleKeyPress = (event) => {
        if (event.charCode === 13) {
            const searchTerm = this.state.searchTerm;
            this.search(searchTerm);
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    render() {
        const phonebooks = this.state.phonebooks;
        const searchTerm = this.state.searchTerm;

        return (
            <div className="PhonebookList">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 no-padding">
                            <div className="pull-left">
                                <div className="col-md-9">
                                    <Form.Group controlId="searchTerm">
                                        <Form.Control
                                            autoFocus
                                            placeholder="Type your search here"
                                            type="text"
                                            value={searchTerm}
                                            onChange={this.handleChange}
                                            onKeyPress={this.handleKeyPress}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-3 no-padding">
                                    <Button onClick={this.search} type="submit">
                                        <FaSearch />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 no-padding">
                            <div className="pull-right">
                                <Link to="/create">
                                    <Button variant="primary"><FaPlusCircle /></Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Phone number</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    phonebooks.length > 0 ? (
                        phonebooks.map((_phonebook, _index) => {
                            return (
                                <PhonebookItem key={_index} phonebook={_phonebook}/>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={4}>No entry found</td>
                        </tr>
                    )
                }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default PhonebookList;