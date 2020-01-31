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
  ListGroupItem,
  FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { login } from './actions';

const LoginFormSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

class LoginPage extends PureComponent {
  handleLogin = ({ username, password }, actions) => {
    const { authenticate } = this.props;
    if (username !== '' && password !== '') {
      authenticate(username, password);
      actions.setSubmitting(false);
    }
  };

  renderErrors = () => {
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
    const { isLoading, isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/app" exact />;
    }
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column h-100">
        {this.renderErrors()}
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={LoginFormSchema}
          onSubmit={this.handleLogin}
        >
          {props => {
            return (
              <Form onSubmit={props.handleSubmit} className="w-50">
                <FormGroup row className="mx-auto">
                  <Label for="usernameInput">Username:</Label>
                  <Input
                    type="text"
                    name="username"
                    id="usernameInput"
                    placeholder="johndoe"
                    onChange={props.handleChange}
                    value={props.values.username}
                    disabled={props.isSubmitting}
                    invalid={
                      props.touched.username &&
                      props.errors.username &&
                      props.errors.username !== ''
                    }
                  />
                  {props.touched.username && props.errors.username ? (
                    <FormFeedback>{props.errors.username}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup row className="mx-auto">
                  <Label for="passwordInput">Password:</Label>
                  <Input
                    type="password"
                    name="password"
                    id="passwordInput"
                    disabled={props.isSubmitting}
                    onChange={props.handleChange}
                    value={props.values.password}
                    invalid={
                      props.touched.password &&
                      props.errors.password &&
                      props.errors.password !== ''
                    }
                  />
                  {props.touched.password && props.errors.password ? (
                    <FormFeedback>{props.errors.password}</FormFeedback>
                  ) : null}
                </FormGroup>
                <Row className="align-items-center justify-content-center mx-auto">
                  {isLoading ? (
                    <Spinner size="md" color="primary" />
                  ) : (
                    <Button
                      color="success"
                      type="submit"
                      size="lg"
                      className="w-100"
                      disabled={props.isSubmitting}
                    >
                      Login
                    </Button>
                  )}
                </Row>
              </Form>
            );
          }}
        </Formik>
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
