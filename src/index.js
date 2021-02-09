import React from 'react'
import PropTypes from 'prop-types'
import Button from 'part:@sanity/components/buttons/default'

import styles from './styles.css'

class SnipcartBestsellers extends React.Component {
  static propTypes = {
    apiKey: PropTypes.string,
    limit: PropTypes.number,
  }

  static defaultProps = {
    apiKey: '',
    limit: 5,
  }

  state = {
    bestsellers: null,
    error: null,
  }
  handleGetBestsellers = async () => {
    
    const request = await fetch(`https://app.snipcart.com/api/products?limit=${this.props.limit}&orderBy=nbrSales`, {
      headers: {
          'Authorization': `Basic ${btoa(this.props.apiKey)}`,
          'Accept': 'application/json',
      }
    })

    const bestsellers = await request.json()
    this.setState({bestsellers})
  }

  componentDidMount() {
    this.handleGetBestsellers()
  }

  render() {
    const {error, bestsellers} = this.state
  
    if (error) {
      return <pre>{JSON.stringify(error, null, 2)}</pre>
    } else if (bestsellers === null) {
      return (
        <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Bestsellers</h2>
        </header>
        <div className={styles.content} id="loading-cont">
          <h2>Loading...</h2>
        </div>
      </div>
      )
    // eslint-disable-next-line no-else-return
    } else {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Bestsellers</h2>
        </header>
        <div className={styles.content}>
          {bestsellers.items.map(i =>
            <div key={i.id} className={styles.product}>
              <div className={styles.avatar}>
                <img src={i.image} width="60px"/>
              </div>
              <a className={styles.link} href={i.url}>
                <h4>{i.name} has been sold {i.statistics.numberOfSales} time for a total revenue of ${i.statistics.totalSales}</h4>
              </a>
            </div>
          )} 
        </div>
        <div className={styles.footer}>
            <Button bleed color="primary" kind="simple" onClick={this.handleGetBestsellers}>
              refresh
            </Button>
          </div>
      </div>
    ) }
  }
}

export default {
  name: 'snipcart-bestsellers',
  component: SnipcartBestsellers
}