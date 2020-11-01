import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

import { contactMessage } from "../actions/contactActions";
import { CONTACT_RESET } from "../constants/contactConstants";

const ContactScreen = ({ history, match }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const contactCreateMessage = useSelector(
    (state) => state.contactCreateMessage
  );
  const {
    loading: loadingCreateContact,
    error: errorCreateContact,
    success: successCreateContact,
  } = contactCreateMessage;

  useEffect(() => {
    if (successCreateContact) {
      alert("Message Submitted");
      setTitle("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      dispatch({ type: CONTACT_RESET });
    }
  }, [dispatch, successCreateContact]);

  const submitContactHandler = (e) => {
    e.preventDefault();
    dispatch(contactMessage({ title, name, email, phone, message }));
  };

  return (
    <>
      {loadingCreateContact && <Loader />}
      {errorCreateContact && (
        <Message variant="danger">{errorCreateContact}</Message>
      )}

      <FormContainer>
        <h1>Contact</h1>
        <Form onSubmit={submitContactHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Phone Number"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              row="3"
              placeholder="Enter Your Message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button className="btn-block" type="submit" variant="primary">
            Send your Message to us!
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ContactScreen;
