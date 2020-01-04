import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Spinner,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { login } from './actions';

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = event => {
    const { target } = event;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    window.event.preventDefault();
    const { authenticate } = this.props;
    const { username, password } = this.state;
    authenticate(username, password);
  };

  checkError = () => {
    const { errors } = this.props;
    if (errors.length > 0) {
      return (
        <Row className="mx-auto mb-2">
          <ListGroup className="mx-auto">
            {errors.map(error => {
              return (
                <ListGroupItem key={error} color="danger">
                  {error}
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Row>
      );
    }
    return null;
  };

  render() {
    const { username, password } = this.state;
    const { isLoading, isAuthenticated } = this.props;

    return isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
      <Container
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: '100vh' }}
      >
        {this.checkError()}

        <Form onSubmit={this.handleSubmit}>
          <FormGroup row className="mx-auto">
            <Label for="usernameInput">Username:</Label>
            <Input
              type="text"
              name="username"
              id="usernameInput"
              placeholder="johndoe"
              onChange={this.handleChange}
              value={username}
              required
            />
          </FormGroup>
          <FormGroup row className="mx-auto">
            <Label for="passwordInput">Password:</Label>
            <Input
              type="password"
              name="password"
              id="passwordInput"
              onChange={this.handleChange}
              value={password}
              required
            />
          </FormGroup>
          <Row className="align-items-center justify-content-center mx-auto">
            {isLoading ? (
              <Spinner size="md" color="primary" />
            ) : (
              <Button color="success" size="lg" className="w-100">
                Login
              </Button>
            )}
          </Row>
        </Form>
      </Container>
    );
  }
}
LoginPage.propTypes = {
  authenticate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isLoading: state.pages.login.get('isLoading'),
    errors: state.pages.login.get('errors'),
    isAuthenticated: state.auth.get('isAuthenticated')
  };
};

const mapDispatchToProps = {
  authenticate: login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
