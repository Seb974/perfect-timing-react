import React from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'query-string';

class ProductList extends React.Component 
{
    static propTypes = {
        getProducts: PropTypes.func.isRequired,
        product: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };
    
    componentDidMount() {
        const params = qs.parse(this.props.location.search);
        if (typeof params.paymentStatus !== 'undefined' && params.paymentStatus === 'success') {
            this.props.deleteCart();
        }
        this.props.getProducts();
    }

    handleClick = (product, variant) => {
        
    };

    displayVariants = (product) => {
        let Variant = (props) => {
            return (
                <span>
                    <li key={"variant-item-" + props.details.id}>
                        <i className="fas fa-dolly"></i> 
                        {" "} {props.details.stock.quantity} {" "}
                        {props.details.stock.quantity <= 0 ? <span>En rupture de stock !</span> : 
                            (<button className="btn btn-primary btn-sm" onClick={() => this.handleClick(product, props.details)} id={props.details.id}>
                                <i className="fas fa-shopping-cart"></i>
                                {props.details.name}  à {props.details.price}€
                            </button>)
                        }
                    </li>
                </span>
              );
            }
        return product.variants.map(variant => {
            return (
                <span key={"variant-span-" + variant.id}>
                    <hr/>
                    <Variant details={variant} product={product}/>
                </span>
            )
        });
    }

    displayProducts = () => {
        let Product = (props) => {
          return (
            <div className="col-12 col-sm-6 col-md-4 react-product">
                <div className="card card-lg">
                    <div className="card-img">
                        <Link to={ "/show/" + props.details.id }>
                            { 
                                (props.details.picture !== null && props.details.picture !== "" && typeof props.details.picture !== 'undefined') ? <img src={ 'uploads/pictures/' + props.details.picture.b64 } className="card-img-top" alt={ props.details.picture.b64 }/> : ""
                            }
                        </Link>
                    </div>
                    <div className="card-block">
                        <ul>
                            <li key={"product-item-" + props.details.id}>
                                <Link to={ "/show/" + props.details.id }>
                                    { props.details.name }
                                    <br/>
                                    <i className="fas fa-truck"></i> {" "}
                                    { new Date(props.details.supplier.preparationPeriod).getMinutes() }mn @
                                    { props.details.supplier.name }
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            { this.displayVariants(props.details) }
                        </ul>
                    </div>
                </div>
            </div>
          );
        }
        return this.props.product.products.map(product => {
            return <Product key={"product-" + product.id} details={product} />
        });
    }

    render() {
        return (
            <div id="content-wrap">
                <div className="product-wrapper">
                    <section className="p-t-30" id="react-product-list">
                        <div className="container">
                            <div className="row">
                                { this.displayProducts() }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    product: state.product,
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(
    mapStateToProps,
    { getProducts }
  )(ProductList);
