import React, { memo, useCallback } from 'react';
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  ListGroup,
  ListGroupItem,
  FormFeedback
} from 'reactstrap';
import { useFormik } from 'formik';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions';

const LoginFormSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required')
});

export function LoginPage() {
  const dispatch = useDispatch();
  const isAuthenticating = useSelector(state =>
    state.pages.login.get('isAuthenticating')
  );
  const isAuthenticated = useSelector(state =>
    state.auth.get('isAuthenticated')
  );
  const errors = useSelector(state => state.pages.login.get('errors'));

  const handleLogin = useCallback(
    ({ username, password }) => {
      if (username !== '' && password !== '') {
        dispatch(login(username, password));
      }
    },
    [dispatch]
  );

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginFormSchema,
    onSubmit: handleLogin
  });

  if (isAuthenticated) {
    return <Redirect to="/app" exact />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column h-100">
      {errors.size !== 0 && (
        <Row className="mb-2">
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
      )}
      <Form onSubmit={formik.handleSubmit} className="w-75">
        <FormGroup row className="mx-auto">
          <Label for="usernameInput">Username:</Label>
          <Input
            type="text"
            name="username"
            id="usernameInput"
            placeholder="johndoe"
            onChange={formik.handleChange}
            value={formik.values.username}
            disabled={isAuthenticating}
            invalid={
              formik.touched.username &&
              formik.errors.username &&
              formik.errors.username !== ''
            }
          />
          {formik.touched.username && formik.errors.username ? (
            <FormFeedback>{formik.errors.username}</FormFeedback>
          ) : null}
        </FormGroup>

        <FormGroup row className="mx-auto">
          <Label for="passwordInput">Password:</Label>
          <Input
            type="password"
            name="password"
            id="passwordInput"
            disabled={isAuthenticating}
            onChange={formik.handleChange}
            value={formik.values.password}
            invalid={
              formik.touched.password &&
              formik.errors.password &&
              formik.errors.password !== ''
            }
          />
          {formik.touched.password && formik.errors.password ? (
            <FormFeedback>{formik.errors.password}</FormFeedback>
          ) : null}
        </FormGroup>
        <Row className="align-items-center justify-content-center mx-auto">
          <Button
            color="success"
            type="submit"
            size="lg"
            className="w-100"
            disabled={isAuthenticating}
          >
            Login
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default memo(LoginPage);
