import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { contactDetails, contactDelete } from "../actions/contactActions";

const ContactListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contactsDelete = useSelector((state) => state.contactsDelete);
  const { success: successDelete } = contactsDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(contactDetails());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteContactHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(contactDelete(id));
    }
  };

  return (
    <>
      <h1>Contacts Message</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact._id}</td>
                <td>{contact.title}</td>
                <td>{contact.name}</td>
                <td>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </td>
                <td>{contact.phone}</td>
                <td>
                  <LinkContainer to={`/admin/contact/${contact._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteContactHandler(contact._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ContactListScreen;
