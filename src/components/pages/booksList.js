"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBooks } from "../../actions/bookActions";
import { Grid, Row, Button, Col, Carousel } from "react-bootstrap";
import BookItem from "./bookItem";
import BookForm from "./booksForm";
import Cart from "./cart";

class BookList extends Component {
	componentDidMount() {
		this.props.getBooks();
	} //dispatch
	render() {
		const bookList = this.props.books.map(function(booksArr) {
			return (
				<Col xs={12} sm={6} md={4} key={booksArr._id}>
					<BookItem
						key={booksArr._id}
						_id={booksArr._id}
						title={booksArr.title}
						description={booksArr.description}
						price={booksArr.price}
						images={booksArr.images}
					/>
				</Col>
			);
		});
		return (
			<Grid>
				<Row>
					<Carousel>
						<Carousel.Item>
							<img
								width={900}
								height={300}
								alt="900x500"
								src="/images/home1.jpg"
							/>
							<Carousel.Caption>
							
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img
								width={900}
								height={300}
								alt="900x500"
								src="/images/home2.jpg"
							/>
							<Carousel.Caption>
								
							</Carousel.Caption>
						</Carousel.Item>
					
					</Carousel>
				</Row>
				<Row>
					<Cart />
				</Row>
				<Row style={{ marginTop: "15px" }}>{bookList}</Row>
			</Grid>
		);
	}
}
function mapStateToProps(state) {
	return {
		books: state.books.books
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ getBooks: getBooks }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);