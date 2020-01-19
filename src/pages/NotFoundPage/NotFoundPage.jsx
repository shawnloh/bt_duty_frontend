import React, { PureComponent } from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

class NotFoundPage extends PureComponent {
  goBack = () => {
    const {
      history: { goBack }
    } = this.props;
    goBack();
  };

  render() {
    return (
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <h1>404</h1>
            <p>The page that you are looking is not available</p>
            <Button color="primary" onClick={this.goBack}>
              Click Here To Go back
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

NotFoundPage.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
};

export default NotFoundPage;
