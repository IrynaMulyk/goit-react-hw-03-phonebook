import React from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onAddContact = contact => {
    const contacts = this.state.contacts.map(oneContact =>
      oneContact.name.toLowerCase()
    );

    if (contacts.includes(contact.name.toLowerCase())) {
      alert(`${contact.name} is already in phonebook`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: shortid.generate(), ...contact }],
    }));
  };

  isContactinPhonebook = name =>
    this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

  onDeleteContact = event => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== event.target.id
      ),
    }));
  };
  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={css.phonebook}>
        <h1>Phonebook</h1>

        <div className="ContactForm">
          <ContactForm
            onSubmit={this.onAddContact}
            onCheckContact={this.isContactinPhonebook}
          />
        </div>
        {this.state.contacts.length > 0 ? (
          <div>
            <h2>Contacts</h2>
            <Filter
              onChangeFilter={this.onChangeFilter}
              filter={this.state.filter}
            />
            {this.state.contacts.length > 0 && (
              <ContactList
                contacts={visibleContacts}
                onDeleteContact={this.onDeleteContact}
              />
            )}
          </div>
        ) : (
          <div>
            <p>There is no contacts in the phonebook</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
