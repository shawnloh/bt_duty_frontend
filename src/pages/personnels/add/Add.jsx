import React, { memo, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Alert
} from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import usePrevious from '../../../hooks/usePrevious';
import useReduxPageSelector from '../../../hooks/useReduxPageSelector';
import useIsMounted from '../../../hooks/useIsMounted';
import { addPersonnel } from './actions';
import { getPlatoons, getRanks } from './selectors';

import AddForm from '../../../components/personnels/add/AddForm';
import ActionAlert from '../../../components/commons/ActionAlert';

export function Add() {
  const history = useHistory();
  const isMounted = useIsMounted();

  const pages = useMemo(() => ['personnels', 'add'], []);
  const actionInProgress = useReduxPageSelector(pages, 'actionInProgress');
  const errors = useReduxPageSelector(pages, 'errors');

  const prevActionInProgress = usePrevious(actionInProgress);
  const ranks = useSelector(getRanks);
  const platoons = useSelector(getPlatoons);
  const dispatch = useDispatch();

  // handle redirect to personnels page after creating person
  useEffect(() => {
    if (
      prevActionInProgress &&
      !actionInProgress &&
      errors.size === 0 &&
      isMounted.current
    ) {
      history.replace('/personnels');
    }
  }, [actionInProgress, errors.size, history, isMounted, prevActionInProgress]);

  const handleSubmit = useCallback(
    ({ name, platoon, rank }) => {
      dispatch(addPersonnel(name, platoon, rank));
    },
    [dispatch]
  );

  return (
    <>
      <Helmet>
        <title>Add Personnel</title>
      </Helmet>
      <Container className="py-2">
        <Row className="justify-content-center align-items-center">
          <Col>
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag={Link} to="/personnels">
                Personnels
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Add
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        {ranks.size === 0 ||
          (platoons.size === 0 && (
            <Row>
              <Col>
                <Alert color="danger">
                  <Link to="/ranks">Rank</Link> /{' '}
                  <Link to="/platoons">Platoon</Link> is needed to create
                  personnels
                </Alert>
              </Col>
            </Row>
          ))}
        {errors.length > 0 && (
          <Row>
            <Col>
              <Alert color="danger" className="w-100">
                {errors.map(error => {
                  return (
                    <p className="mb-0" key={error}>
                      {error}
                    </p>
                  );
                })}
              </Alert>
            </Col>
          </Row>
        )}
        {actionInProgress && (
          <Row>
            <Col>
              <ActionAlert name="Adding" />
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <AddForm
              handleSubmit={handleSubmit}
              platoons={platoons}
              ranks={ranks}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default memo(Add);
