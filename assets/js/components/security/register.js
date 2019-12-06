import React from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';

class Register extends React.Component 
{
    state = {
        // username: '',
        email: '',
        password: '',
        confirmPassword: '',
        msg: null
      };
    
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate = () => {
        if (this.state.msg !== '') {
            this.setState({msg: ''});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleLogin = e => {
        e.preventDefault();
        // const { username, email, password, confirmPassword } = this.state;
        const { email, password, confirmPassword } = this.state;
        if ( password === confirmPassword ) {
            // const user = { username, email, password };
            const user = { email, password };
            this.setState({
                // username: '', 
                email: '', 
                password: '', 
                confirmPassword: '',
                msg: ''
            });
            this.props.register(user);
        }
        else {
            this.setState({msg: 'Les mots de passes entrés ne sont pas identiques'});
        }
    };

    render() {
        if (!this.props.isAuthenticated) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-8 col-md-4 mx-auto">
                            <div className="card m-b-0">
                                <div className="card-header">
                                    <h4 class="card-title">
                                        <i class="fa fa-user-plus"></i>
                                        Créer un compte utilisateur
                                    </h4>
                                </div>
                                <div className="card-block">
                                    {this.state.msg ? (
                                        <Alert color='danger'>{this.state.msg}</Alert>
                                    ) : null}
                                    <form onSubmit={this.handleLogin}>
                                        {(!this.props.isAuthenticated) ? "" : 
                                            <div className="mb-3">
                                                You are logged in as 
                                                { " " + this.props.user.email },
                                                <a href="{{ path('logout') }}"> Logout</a>
                                            </div>
                                        }
                                        {/* <div className="form-group input-icon-left m-b-10">
                                            <i className="fa fa-user"></i>
                                            <label className="sr-only">Pseudo</label>
                                            <input type="text" name="username" id="inputUsername" className="form-control" placeholder="Pseudo" required autoFocus value={this.state.username} onChange={this.onChange}/>
                                        </div> */}
                                        <div className="form-group input-icon-left m-b-10">
                                            <i className="fa fa-envelope"></i>
                                            <label className="sr-only">Email</label>
                                            <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email" required value={this.state.email} onChange={this.onChange}/>
                                        </div>

                                        <div className="form-group input-icon-left m-b-10">
                                            <i className="fa fa-lock"></i>
                                            <label className="sr-only">Mot de passe</label>
                                            <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Mot de passe" required value={this.state.password} onChange={this.onChange}/>
                                        </div>

                                        <div className="form-group input-icon-left m-b-10">
                                            <i className="fa fa-lock"></i>
                                            <label className="sr-only">Confirmation du mot de passe</label>
                                            <input type="password" name="confirmPassword" id="inputConfirmPassword" className="form-control" placeholder="Confirmation du mot de passe" required value={this.state.confirmPassword} onChange={this.onChange}/>
                                        </div>

                                        <button type="submit" class="btn btn-primary m-t-10 btn-block">S'ENREGISTRER</button>

                                        <div className="divider">
                                            <span>Déjà client ?</span>
                                        </div>
                                        <Link className="btn btn-secondary btn-block" to="/login" role="button">S'IDENTIFER</Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
            } 
            else {
                return <Redirect to='/'/>
            }
        } 
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error
});
  
export default connect( mapStateToProps, { register, clearErrors })(Register);