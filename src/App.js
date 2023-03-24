import React, { Component } from "react";
import shortid from "shortid";

import Form from "./Components/Form";
import ContactList from "./Components/ContactList";
import Filter from "./Components/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };
  componentDidMount() {
    const numbers = localStorage.getItem("contacts");
    const parsNumbers = JSON.parse(numbers);

    if (parsNumbers) {
      this.setState({ contacts: parsNumbers });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  getVisebleTodos = () => {
    const { filter, contacts } = this.state;
    const normolizedFilter = filter.toLowerCase().trim();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normolizedFilter)
    );
  };
  nameUniquenessCheck = (newName) => {
    return this.state.contacts.some((contact) => contact.name === newName);
  };

  addContacts = ({ name, number }) => {
    if (this.nameUniquenessCheck(name)) {
      alert("такой контакт уже есть");
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  DeleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  render() {
    const visibleContacts = this.getVisebleTodos();

    return (
      <div>
        <h1 className="title">Phonebook</h1>
        <Form addContacts={this.addContacts} />
        <h2 className="title">Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.DeleteContact}
        />
      </div>
    );
  }
}

export default App;
