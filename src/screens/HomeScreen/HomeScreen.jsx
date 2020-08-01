import React, { Component, useState, useEffect } from "react";
import { Container, InputGroup, Form, FormControl, Button, Dropdown, DropdownButton, } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

// for dev purposes
import { LoremIpsum } from 'react-lorem-ipsum';

const useStyles = theme => ({
  searchBar: {
    flexDirection: 'row', display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'sticky', top: 0,
    backgroundColor: theme.palette.background.default
  },

  content: {
    padding: theme.spacing(1),
  },

});

const [result, setResult] = useState(0);

useEffect(() => {
  fetch("/test").then(res => res.json()).then(data => {
    setResult(data.response)
  })
}, []);

const AVAILABLE_DROPDOWN_SETTINGS = [
  { id: 'date', text: 'Date' },
  { id: 'upvotes', text: 'Upvotes' },
  { id: 'cefr', text: 'CEFR' }
]

class HomeScreen extends Component {

  state = {
    sortBy: null
  }

  setSortBy = (id) => {
    this.setState({ sortBy: id });
  }

  getSortByText = () => {
    const { sortBy } = this.state;
    if (sortBy === null) return 'Sort By...';
    return AVAILABLE_DROPDOWN_SETTINGS.find(({ id }) => id === sortBy).text;
  }

  render() {
    const { classes } = this.props;
    const { sortBy } = this.state;
    return (
      <Container>

        <div className={classes.searchBar}>
          <InputGroup className="p-3" style={{ maxWidth: '30rem' }}>
            <FormControl
              onChange={({ target }) => { this.setState({ _searchText: target.value }); }}
              placeholder="Search by name"
              aria-label="Search by name {result}"
            />
            <InputGroup.Append>
              <Button onClick={() => { this.setState({ searchText: this.state._searchText }); }} variant="outline-primary">Search</Button>
            </InputGroup.Append>
          </InputGroup>

          <DropdownButton id="dropdown-basic-button" title={this.getSortByText()}>
            {AVAILABLE_DROPDOWN_SETTINGS.map(({ id, text }) =>
              <Dropdown.Item key={id} onClick={() => { this.setSortBy(id) }}>{text}</Dropdown.Item>)}

            {sortBy && <Dropdown.Item key={'reset'}
              onClick={() => { this.setSortBy(null) }}>
              <i className="fa fa-times pr-2" />
              Reset</Dropdown.Item>}
          </DropdownButton>
        </div>

        <div className={classes.content}>
          <LoremIpsum p={10} />
        </div>
      </Container>
    )
  }
}

export default withStyles(useStyles)(HomeScreen);
