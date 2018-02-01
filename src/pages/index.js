import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import StoreModal from '../components/StoreModal'

import theme from '../styles/theme'
import media from '../styles/media'

import 'bootstrap/dist/css/bootstrap.min.css'

const Container = styled.div`
  background-color: ${props => props.theme.mainColor};

  ${media.lg`padding: 0 20px;`};
`

export default class Home extends React.Component {
  state = {
    selectedCity: '0',
    isOpen: false,
    modalContent: {
      name: '',
      benefit: '',
      address: '',
      web: ''
    }
  }

  onStorePress = (name, address, benefit, web) => {
    this.setState({
      isOpen: true,
      modalContent: { name: name, address: address, benefit: benefit, web: web }
    })
  }

  onModalClose = () => {
    this.setState({
      isOpen: false,
      modalContent: { name: '', address: '', benefit: '', web: '' }
    })
  }

  handleCityChange = event => {
    this.setState({ selectedCity: event.target.value })
  }

  render() {
    const { data } = this.props
    const cities = this.props.data.allStoresCsv.edges
      .reduce((accumulator, { node: { category, city, name } }) => {
        if (!accumulator.includes(city)) {
          accumulator.push(city)
        }
        return accumulator
      }, [])
      .map(city => (
        <option key={city} value={city}>
          {city}
        </option>
      ))
    const stores = data.allStoresCsv.edges
      .filter(({ node: { city } }) => {
        if (this.state.selectedCity === '0') return true
        return city === this.state.selectedCity
      })
      .map(({ node: { name, address, web, benefit } }) => (
        <button key={name} onClick={() => this.onStorePress(name, address, benefit, web)}>
          <h3>{name}</h3>
        </button>
      ))
    return (
      <ThemeProvider theme={theme}>
        <Container className="container">
          <h1>{data.site.siteMetadata.title}</h1>
          <div className="form-group">
            <select
              name=""
              id=""
              value={this.state.selectedCity}
              className="form-control"
              onChange={this.handleCityChange}
            >
              <option value="0"> - Seleccione -</option>
              {cities}
            </select>
          </div>
          {stores}
          <StoreModal
            isModalOpen={this.state.isOpen}
            onModalClose={this.onModalClose}
            modalContent={this.state.modalContent}
          />
        </Container>
      </ThemeProvider>
    )
  }
}

export const query = graphql`
  query SiteQuery {
    allStoresCsv {
      edges {
        node {
          name
          address
          benefit
          web
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
