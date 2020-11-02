import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { contactDetails } from "../actions/contactActions";

const ContactDetailsScreen = () => {
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(contactDetails());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Contact Message Details</h1>
        {loading && <Loader />}
        {error && <Message variang="danger">{error}</Message>}

        <Form></Form>
      </FormContainer>
    </>
  );
};

export default ContactDetailsScreen;
