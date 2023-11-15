import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/generateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
            });
    
            if (response.ok) {
                const token = await response.text();
                console.log('Login successful, token:', token);
                localStorage.setItem('token', token);
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
        
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input
                        name="username"
                        type="email"
                        value={this.state.username}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        );
    }
}

export default Login;
