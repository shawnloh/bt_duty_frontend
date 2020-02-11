import React, { memo, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Row, Button, Progress, Col } from 'reactstrap';
import { loadApp } from './actions';
import useReduxPageSelector from '../../hooks/useReduxPageSelector';

function LoadingPage() {
  const page = 'loading';
  const appLoaded = useReduxPageSelector(page, 'appLoaded');
  const appLoadedFailure = useReduxPageSelector(page, 'appLoadedFailure');
  const isLoading = useReduxPageSelector(page, 'isLoading');
  const taskLoading = useReduxPageSelector(page, 'taskLoading');
  const dispatch = useDispatch();

  const loadApplication = useCallback(() => {
    return dispatch(loadApp());
  }, [dispatch]);

  useEffect(() => {
    if (!appLoaded && !isLoading) {
      loadApplication();
    }
  }, [appLoaded, dispatch, isLoading, loadApplication]);

  if (!isLoading && appLoaded && taskLoading === 0 && !appLoadedFailure) {
    return <Redirect to="/dashboard" exact />;
  }

  if (appLoadedFailure) {
    return (
      <Container className="h-100">
        <Row className="h-100">
          <Col className="my-auto mx-auto">
            <p className="text-center">ERROR LOADING APPLICATION.</p>
            <Button color="primary" onClick={loadApplication}>
              Retry?
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  const progress = (1 / taskLoading) * 100;
  return (
    <Container className="h-100">
      <Row className="h-100">
        <Col className="my-auto mx-auto">
          <Progress animated value={progress} />
          <p className="text-center">Loading Application</p>
        </Col>
      </Row>
    </Container>
  );
}

export default memo(LoadingPage);
