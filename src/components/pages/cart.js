"use strict";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
	Panel,
	Col,
	Row,
	Well,
	Button,
	ButtonGroup,
	Label,
	Modal
} from "react-bootstrap";
import { bindActionCreators } from "redux";
import { deleteCartItem,updateCartItem,getCart } from "../../actions/cartActions";

class Cart extends Component {
	componentDidMount(){
		this.props.getCart();
	}
	onDelete(_id) {
		//create a copy of the current array of books
		const currentBookToDelete = this.props.cart;
		//determine at which index in books array is the book to be deleted
		const indexToDelete = currentBookToDelete.findIndex(cart => {
			return cart._id === _id;
		});
		//use slice to remove the book at the specified  id
		let cartAfterDelete=[
			...currentBookToDelete.slice(0, indexToDelete),
			...currentBookToDelete.slice(indexToDelete + 1)
		];

		this.props.deleteCartItem(cartAfterDelete);
	}
	onIncrement(_id)
	{
		this.props.updateCartItem(_id,1,this.props.cart); //current cart array
	}
	onDecrement(_id,quantity)
	{
		if(quantity>1)
		{
			this.props.updateCartItem(_id,-1,this.props.cart);

		}
	}
	constructor()
	{
		super();
		this.state={
			showModal:false
		}
	}
	open(){
		this.setState({showModal:true})
	}
	close(){
		this.setState({showModal:false})
	}
	render() {
		if (this.props.cart[0]) {
			return this.renderCart();
		} else {
			return this.renderEmpty();
		}
	}
	renderEmpty() {
		return <div />;
	}
	renderCart() {
		const cartItemsList = this.props.cart.map(function(cartArray) {
			return (
				<Panel key={cartArray._id}>
					<Row>
						<Col xs={12} sm={4}>
							<h6>{cartArray.title}</h6>
							<span> </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>usd.{cartArray.price}</h6> <span> </span>
						</Col>
						<Col xs={12} sm={2}>
							<h6>
								qty.<Label bsStyle="success">{cartArray.quantity}</Label>
							</h6>
							<span> </span>
						</Col>
						<Col xs={6} sm={4}>
							<ButtonGroup style={{ minW_idth: "300px" }}>
								<Button onClick={()=>this.onDecrement(cartArray._id,cartArray.quantity)} bsStyle="default" bsSize="small">
									Remove
								</Button>
								<Button onClick={()=>this.onIncrement(cartArray._id)} bsStyle="default" bsSize="small">
									Add{" "}
								</Button>
								<span />
								<Button onClick={()=>this.onDelete(cartArray._id)} bsStyle="danger" bsSize="small">
									Delete
								</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			);
		},this);
		return (
			<Panel header="Cart" bsStyle="primary">
				{cartItemsList}
				<Row>
				<Col xs={12}>
				<h6>{this.props.totalAmount}$ </h6>
				<Button onClick={()=>this.open()}bsStyle="success" bsSize="small">
				Proceed to checkout
				</Button>
				</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={()=>this.close()}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you</Modal.Title>
          </Modal.Header>
          <Modal.Body>
    
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
         
          </Modal.Body>
          <Modal.Footer>
          <Col xs={6}>
          <h6> Total {this.props.totalAmount}$</h6>
          </Col>
            <Button onClick={()=>this.close()}>Close</Button>
          </Modal.Footer>
        </Modal>
			</Panel>
		);
	}
}
function mapStateToProps(state) {
	return {
		cart: state.cart.cart,
		totalAmount:state.cart.totalAmount
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			deleteCartItem: deleteCartItem,
			updateCartItem:updateCartItem,
			getCart:getCart
		},
		dispatch
	);
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);