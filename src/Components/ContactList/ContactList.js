import React from "react";
import PropTypes from "prop-types";

import s from "./ContactsList.module.css";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={s.List}>
    {contacts.map(({ id, name, number }) => (
      <li className={s.Item} key={id}>
        <p>
          {name}: {number}
        </p>
        <button className={s.Button} onClick={() => onDeleteContact(id)}>
          удалить
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
