import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map(contact => (
        <li key={contact.id} className={css.contact}>
          <p>
            {contact.name}, {contact.number}
          </p>
          <button
            type="button"
            className={css.deleteContactBtn}
            id={contact.id}
            onClick={onDeleteContact}
          >
            delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};
export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
