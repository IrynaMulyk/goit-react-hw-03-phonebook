import React from 'react';
import css from './ContactForm.module.css';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.newContactForm}>
        <div className={css.nameContainer}>
          <label htmlFor={this.nameInputId} className={css.nameLabel}>
            Name
            <input
              type="text"
              name="name"
              className={css.nameInput}
              id={this.nameInputId}
              value={this.state.name}
              onChange={this.handleInputChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
        </div>
        <div className={css.numberContainer}>
          <label htmlFor={this.telInputId} className={css.numberLabel}>
            Number
            <input
              type="tel"
              name="number"
              className={css.numberInput}
              value={this.state.number}
              onChange={this.handleInputChange}
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
        </div>
        <button type="submit" className={css.addContactBtn}>
          Add contact
        </button>
      </form>
    );
  }
}
export default ContactForm;
