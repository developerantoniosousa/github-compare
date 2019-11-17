import React, { Component } from 'react';

import Moment from 'moment';

import { Container, Form } from './styles';

import CompareList from '../../components/CompareList';

import Logo from '../../assets/logo.png';

import api from '../../services/api';

class Main extends Component {
  state = {
    repositories: [],
    repositoryInput: '',
    error: false,
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    const { repositoryInput, repositories } = this.state;

    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${repositoryInput}`);

      response.data.last_commit = Moment(response.data.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, response.data],
        repositoryInput: '',
        loading: false,
        error: false,
      });
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryInput, error, loading,
    } = this.state;

    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form withError={error} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            value={repositoryInput}
            placeholder="usuário/repositório"
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>

        <CompareList repositories={repositories} />
      </Container>
    );
  }
}

export default Main;
