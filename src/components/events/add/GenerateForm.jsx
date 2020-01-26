import React, { useState } from 'react';
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const checkDateValid = date => {
  return moment(date, 'DDMMYY', true).isValid();
};

const GenerateForm = ({
  ranks,
  rankIds,
  platoons,
  platoonIds,
  statuses,
  statusIds,
  handleSubmit,
  date
}) => {
  const [modal, setModal] = useState(false);
  const [pioneersQty, setPioneersQty] = useState(1);
  const [WSQty, setWSQty] = useState(0);
  const [selectedRanks, setSelectedRanks] = useState([]);
  const [selectedPlatoons, setSelectedPlatoons] = useState([]);

  const [statusesOnly, setStatusesOnly] = useState(false);
  const [excludeStatus, setExcludeStatus] = useState([]);
  const [prevExcludeStatuses, setPrevExcludeStatuses] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  const checkDisabled = () => {
    if (pioneersQty === 0 && WSQty === 0) {
      return true;
    }
    if (selectedPlatoons.length === 0 || selectedRanks.length === 0) {
      return true;
    }
    if (date === '' || !checkDateValid(date)) {
      return true;
    }
    return false;
  };

  const handlePioneerChange = e => setPioneersQty(e.target.value);
  const handleWSChange = e => setWSQty(e.target.value);
  const handlePlatoonsChange = e => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedPlatoons(value);
  };
  const handleRanksChange = e => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedRanks(value);
  };

  const handleStatusesNotAllowedChange = e => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setExcludeStatus(value);
    if (value.length > 0 && statusesOnly) {
      setStatusesOnly(false);
    }
  };

  const handleExcludeStatus = e => {
    if (e.target.checked) {
      setPrevExcludeStatuses(excludeStatus);
      setExcludeStatus(statusIds);
      setStatusesOnly(false);
    } else {
      setExcludeStatus(prevExcludeStatuses);
      setPrevExcludeStatuses([]);
    }
  };

  const handleStatusesOnly = e => {
    if (e.target.checked) {
      setPrevExcludeStatuses(excludeStatus);
      setExcludeStatus([]);
      setStatusesOnly(true);
    } else {
      setExcludeStatus(prevExcludeStatuses);
      setPrevExcludeStatuses([]);
      setStatusesOnly(false);
    }
  };

  const handleSelectAllRanks = e => {
    if (e.target.checked) {
      setSelectedRanks(rankIds);
    } else {
      setSelectedRanks([]);
    }
  };

  const handleSelectAllPlatoons = e => {
    if (e.target.checked) {
      setSelectedPlatoons(platoonIds);
    } else {
      setSelectedPlatoons([]);
    }
  };

  const handleFormSubmission = () => {
    const data = {
      pQty: pioneersQty,
      wsQty: WSQty,

      ranks: selectedRanks,
      platoons: selectedPlatoons
    };

    if (statusesOnly) {
      data.onlyStatus = true;
    } else {
      data.statuses = excludeStatus;
    }

    handleSubmit(data);
    toggle();
  };

  return (
    <Row className="my-2">
      <Col>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Generate</ModalHeader>
          <ModalBody>
            {date === '' && (
              <Row>
                <Col>
                  <p className="text-danger">
                    Please assign a date before using this form
                  </p>
                </Col>
              </Row>
            )}
            <Row>
              <Col>
                <FormGroup>
                  <Label for="PioneersQty">Pioneers Qty</Label>
                  <Input
                    type="number"
                    name="pioneersQty"
                    id="PioneersQty"
                    value={pioneersQty}
                    onChange={handlePioneerChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="WSQty">WSpec Qty</Label>
                  <Input
                    type="number"
                    name="WSQty"
                    id="WSQty"
                    value={WSQty}
                    onChange={handleWSChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="selectPlatoons">Platoons</Label>
                  <Input
                    type="select"
                    name="selectPlatoons"
                    id="selectPlatoons"
                    multiple
                    value={selectedPlatoons}
                    onChange={handlePlatoonsChange}
                  >
                    {platoonIds.map(id => {
                      const platoon = platoons[id];
                      return (
                        <option value={id} key={id}>
                          {platoon.name}
                        </option>
                      );
                    })}
                  </Input>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={handleSelectAllPlatoons}
                        checked={selectedPlatoons.length === platoonIds.length}
                      />{' '}
                      All Platoons
                    </Label>
                  </FormGroup>
                </FormGroup>

                <FormGroup>
                  <Label for="selectRanks">Ranks</Label>
                  <Input
                    type="select"
                    name="selectRanks"
                    id="selectRanks"
                    multiple
                    value={selectedRanks}
                    onChange={handleRanksChange}
                  >
                    {rankIds.map(id => {
                      const rank = ranks[id];
                      return (
                        <option value={id} key={id}>
                          {rank.name}
                        </option>
                      );
                    })}
                  </Input>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        onChange={handleSelectAllRanks}
                        checked={selectedRanks.length === rankIds.length}
                      />{' '}
                      All Ranks
                    </Label>
                  </FormGroup>
                </FormGroup>

                <FormGroup>
                  <Label for="selectStatuses">Statuses not allowed</Label>
                  <Input
                    type="select"
                    name="selectStatuses"
                    id="selectStatuses"
                    multiple
                    value={excludeStatus}
                    onChange={handleStatusesNotAllowedChange}
                  >
                    {statusIds.map(id => {
                      const status = statuses[id];
                      return (
                        <option value={id} key={id}>
                          {status.name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={handleExcludeStatus}
                      checked={excludeStatus.length === statusIds.length}
                    />{' '}
                    Exclude All Status
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      onChange={handleStatusesOnly}
                      checked={statusesOnly}
                    />{' '}
                    Statuses Only
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={handleFormSubmission}
              disabled={checkDisabled()}
            >
              Generate
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Button color="primary" onClick={toggle}>
          Generate Personnels
        </Button>
      </Col>
    </Row>
  );
};

GenerateForm.propTypes = {
  ranks: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  rankIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  platoons: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  platoonIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  statuses: PropTypes.shape({
    id: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  }).isRequired,
  statusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired
};

export default GenerateForm;
