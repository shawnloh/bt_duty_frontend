import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
  Form,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

export class AddPersonnel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rank: null,
      platoon: null
    };
  }

  componentDidMount() {
    const { rankIds, platoonIds } = this.props;
    this.setState({
      rank: rankIds[0],
      platoon: platoonIds[0]
    });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  checkDisabledSubmit = () => {
    const { rank, platoon, name } = this.state;
    if (name === '') return true;
    if (!rank || !platoon) return true;

    return false;
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { rankIds, ranks, platoonIds, platoons } = this.props;
    return (
      <>
        <Helmet>
          <title>Add Personnel</title>
        </Helmet>
        <Container>
          <Row className="my-2 justify-content-center align-items-center">
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
          <Row>
            <Col>
              <Form>
                <FormGroup>
                  <Label for="nameInput">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="nameInput"
                    placeholder="John"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="rankSelect">Rank</Label>
                  <Input
                    type="select"
                    name="rank"
                    id="rankSelect"
                    onChange={this.handleChange}
                  >
                    {rankIds.map(id => {
                      return (
                        <option value={id} key={id}>
                          {ranks[id].name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="platoonSelect">Platoon</Label>
                  <Input
                    type="select"
                    name="platoon"
                    id="platoonSelect"
                    onChange={this.handleChange}
                  >
                    {platoonIds.map(id => {
                      return (
                        <option value={id} key={id}>
                          {platoons[id].name}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <Button
                  color="success"
                  className="w-100"
                  disabled={this.checkDisabledSubmit()}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  rankIds: state.ranks.get('ids'),
  ranks: state.ranks.get('ranks'),
  platoonIds: state.platoons.get('ids'),
  platoons: state.platoons.get('platoons')
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(AddPersonnel);
