import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// @desc Create new contact from
// @route POST /api/contact
// access Public

const addContactForm = asyncHandler(async (req, res) => {
  const { title, name, email, phone, message } = req.body;

  const messageExist = await Contact.findOne({ email: email });

  if (messageExist) {
    res.status(400);
    throw new Error("You already sent a message, please wait to be contacted");
  }

  const contact = await Contact.create({
    title,
    name,
    email,
    phone,
    message,
  });

  if (contact) {
    res.status(201).json({
      _id: contact.id,
      title: contact.title,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
    });
  } else {
    throw new Error("Invalid contact form");
  }
});

// @desc Get contact from
// @route Get /api/contact
// access Private/Admin

const getContactForm = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
});

// @desc Delete contact from
// @route Delete /api/contact/:id
// access Private/Admin

const deleteContactForm = asyncHandler(async (req, res) => {
  const contacts = await Contact.findById(req.params.id);
  if (contacts) {
    await contacts.remove();
    res.json({ message: "Contact message removed" });
  } else {
    res.status(404);
    throw new Error("Contact message not found");
  }
});

export { addContactForm, getContactForm, deleteContactForm };
