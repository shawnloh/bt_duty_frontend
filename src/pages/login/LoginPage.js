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
  Alert
} from 'reactstrap';
import { withRouter, Redirect } from 'react-router-dom';
import { login } from '../../actions/userActions';

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
      [name]: value,
      authenticated: false
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
      return errors.map(error => {
        return (
          <Row key={error}>
            <Alert color="danger" className="w-100">
              {error}
            </Alert>
          </Row>
        );
      });
    }
    return null;
  };

  render() {
    const { username, password } = this.state;
    const { isLoading, token } = this.props;

    return token !== '' ? (
      <Redirect to="/app" />
    ) : (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Form onSubmit={this.handleSubmit}>
          {this.checkError()}

          <FormGroup row>
            <Label for="usernameInput">Username:</Label>
            <Input
              type="text"
              name="username"
              id="usernameInput"
              placeholder="johndoe"
              onChange={this.handleChange}
              value={username}
            />
          </FormGroup>
          <FormGroup row>
            <Label for="passwordInput">Password:</Label>
            <Input
              type="password"
              name="password"
              id="passwordInput"
              onChange={this.handleChange}
              value={password}
            />
          </FormGroup>
          <Row className="align-items-center justify-content-center">
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
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.user.get('isLoading'),
  errors: state.user.get('errors'),
  token: state.user.get('token')
});

const mapDispatchToProps = {
  authenticate: login
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
