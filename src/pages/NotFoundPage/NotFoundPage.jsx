import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';

export function NotFoundPage() {
  const history = useHistory();
  const handleGoBack = useCallback(() => {
    if (history.length > 1) {
      return history.goBack();
    }
    return history.replace('/');
  }, [history]);
  return (
    <>
      <Helmet>
        <title>404 Not Found!</title>
      </Helmet>
      <Container className="h-100">
        <Row className="h-100 justify-content-center align-items-center">
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <h1>404</h1>
            <p>The page that you are looking is not available</p>
            <Button color="primary" onClick={handleGoBack}>
              Click Here To Go back
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default memo(NotFoundPage);
