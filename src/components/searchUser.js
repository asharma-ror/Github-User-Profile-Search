import React, {Component} from 'react';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {Input, Form, Button} from 'antd';

import {getUserProfile} from '../actions';

const FormItem = Form.Item;

class SearchUserComponent extends Component {
  static defaultProps = {
    initialInputValue: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.initialInputValue,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialInputValue !== this.props.initialInputValue) {
      this.updateInputValueState(nextProps.initialInputValue);
    }
  }

  updateInputValueState(inputValue) {
    this.setState(() => ({inputValue}));
  }

  handleOnChange = (event) => {
    event.persist();
    this.updateInputValueState(event.target.value);
  }

  handleOnSubmit = (event) => {
    event.preventDefault();
    const {inputValue} = this.state;
    if (!inputValue) return;
    this.props.getUserProfile(inputValue);
    this.context.router.history.push(`/${inputValue}`);
  }

  render() {
    const {inputValue} = this.state;

    return (
      <div className={'form-wrapper'}>
        <h3>Search for a user</h3>
        <Form 
          onSubmit={this.handleOnSubmit} 
          layout='inline' 
          className={'login-form'}
        >
          <FormItem>
            <Input
              placeholder="Github user name"
              value={inputValue}
              onChange={this.handleOnChange}
            />
          </FormItem>  
          <FormItem>
            <Button 
              type="primary" 
              className={'login-form-button'} 
              htmlType="submit"
            >
              Submit
            </Button>
          </FormItem> 
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserProfile: (username) => dispatch(getUserProfile(username)),
});

SearchUserComponent.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, mapDispatchToProps) (SearchUserComponent);
