"use strict";
import React, { Component } from "react";
import {
	MenuItem,
	InputGroup,
	DropdownButton,
	Image,
	Button,
	Col,
	Row,
	Well,
	Panel,
	FormControl,
	FormGroup,
	ControlLabel
} from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	postBooks,
	deleteBooks,
	getBooks,
	resetButton
} from "../../actions/bookActions";
import { findDOMNode } from "react-dom";
import axios from "axios";
class BooksForm extends Component {
	constructor() {
		super();
		this.state = {
			images: [{}],
			img: ""
		};
	}
	componentDidMount() {
		this.props.getBooks();
		//get images from api
		axios
			.get("/api/images")
			.then(
				function(response) {
					this.setState({ images: response.data });
				}.bind(this)
			)
			.catch(
				function(err) {
					this.setState({
						images: "errror loading file from the server"
					});
				}.bind(this)
			);
	}

	handleSubmit() {
		const book = [
			{
				images: findDOMNode(this.refs.image).value,
				title: findDOMNode(this.refs.title).value,
				description: findDOMNode(this.refs.description).value,
				price: findDOMNode(this.refs.price).value
			}
		];
		this.props.postBooks(book);
	}
	onDelete() {
		let bookId = findDOMNode(this.refs.delete).value;
		this.props.deleteBooks(bookId);
	}
	handleSelect(img) {
		console.log(img);
		this.setState({
			img: "/images/" + img
		});
	}
	resetForm() {
		//reset the button
		this.props.resetButton();
		this.setState({ img: "" });
		findDOMNode(this.refs.title).value = "";
		findDOMNode(this.refs.description).value = "";
		findDOMNode(this.refs.price).value = "";
	}
	render() {
		//							{(!this.props.msg)?("Save book"):(this.props.msg)}: if msg doesnt exist then display savebook otherwisedisplay msg
		const imgList = this.state.images.map(function(imgArr, i) {
			return (
				<MenuItem
					key={i}
					onClick={this.handleSelect.bind(this, imgArr.name)}
					eventKey={imgArr.name}
				>
					{imgArr.name}
				</MenuItem> //name in api server
			);
		}, this);

		const booksList = this.props.books.map(function(booksArray) {
			return <option key={booksArray._id}>{booksArray._id}</option>;
		});
		return (
			<Well>
				<Row>
					<Col xs={12} sm={6}>
						<Panel>
							<InputGroup>
								<FormControl
									type="text"
									ref="image"
									value={this.state.img}
								/>
								<DropdownButton
									componentClass={InputGroup.Button}
									id="input-dropdown-addon"
									title="Select Image"
									bsStyle="primary"
								>
									{imgList}
								</DropdownButton>
							</InputGroup>
							<Image src={this.state.img} responsive />
						</Panel>
					</Col>
					<Col xs={12} sm={6}>
						<Panel>
							<FormGroup
								controlId="title"
								validationState={this.props.validation}
							>
								<ControlLabel>Tilte</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter title"
									ref="title"
								/>
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup
								controlId="description"
								validationState={this.props.validation}
							>
								<ControlLabel>description</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter description"
									ref="description"
								/>
								<FormControl.Feedback />
							</FormGroup>

							<FormGroup
								controlId="price"
								validationState={this.props.validation}
							>
								<ControlLabel>price</ControlLabel>
								<FormControl
									type="text"
									placeholder="Enter price"
									ref="price"
								/>
								<FormControl.Feedback />
							</FormGroup>
							<Button
								onClick={
									!this.props.msg ? (
										this.handleSubmit.bind(this)
									) : (
										this.resetForm.bind(this)
									)
								}
								bsStyle={
									!this.props.style ? (
										"primary"
									) : (
										this.props.style
									)
								}
							>
								{!this.props.msg ? "Save book" : this.props.msg}
							</Button>
						</Panel>
						<Panel>
							<FormGroup controlId="formControlsSelect">
								<ControlLabel>
									Select a bookID to delete{" "}
								</ControlLabel>
								<FormControl
									ref="delete"
									componentClass="select"
									placeholder="select"
								>
									<option value="select">select</option>
									{booksList}
								</FormControl>
							</FormGroup>
							<Button
								bsStyle="danger"
								onClick={this.onDelete.bind(this)}
							>
								Delete
							</Button>
						</Panel>
					</Col>
				</Row>
			</Well>
		);
	}
}
function mapStateToProps(state) {
	return {
		books: state.books.books,
		msg: state.books.msg,
		style: state.books.style,
		validation: state.books.validation
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ postBooks, deleteBooks, getBooks, resetButton },
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm);