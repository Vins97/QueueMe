import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { Typography } from '@material-ui/core';
import { ListItem } from '@material-ui/core';


class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <ListItem>
        {editMode ? (
          <Input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
            <span>
              <Typography variant='h5'>
                {message.user.username || message.user.userId}
              </Typography>{' '}
              <Typography variant='h6'>
                {message.text} {message.editedAt && <span>(Edited)</span>}
              </Typography>
            </span>
          )}

        {editMode ? (
          <span>
            <Button onClick={this.onSaveEditText}>Save</Button>
            <Button onClick={this.onToggleEditMode}>Reset</Button>
          </span>
        ) : (
            <Button onClick={this.onToggleEditMode}>Edit</Button>
          )}

        {!editMode && (
          <Button
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
          >
            Delete
          </Button>
        )}
      </ListItem>
    );
  }
}

export default MessageItem;
