import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userInfo: null,
            loginError: null,
            userInfoError: null
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/auth/generateToken', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: this.state.username, password: this.state.password }),
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('token', token);
                this.fetchUserInfo(token);
            } else {
                this.setState({ loginError: 'Login failed' });
            }
        } catch (error) {
            this.setState({ loginError: 'Error during login' });
        }
    }

    fetchUserInfo = async (token) => {
        try {
            const response = await fetch('http://localhost:8080/auth/getUserInfo', {
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            });

            if (response.ok) {
                const userInfo = await response.json();
                this.setState({ userInfo });
            } else {
                this.setState({ userInfoError: 'Failed to load user info' });
            }
        } catch (error) {
            this.setState({ userInfoError: 'Error fetching user info' });
        }
    }

    render() {
        const { username, password, userInfo, loginError, userInfoError } = this.state;

        if (userInfo) {
            return (
                <div>
                    <h1>User Profile</h1>
                    <p>Username: {userInfo.username}</p>
                    <p>Firstname: {userInfo.firstname}</p>
                    <p>Surname: {userInfo.surname}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Roles: {userInfo.roles}</p>
                    <p>Is Admin: {userInfo.isAdmin ? 'Yes' : 'No'}</p>
                </div>
            );
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Username:
                    <input name="username" type="email" value={username} onChange={this.handleInputChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input name="password" type="password" value={password} onChange={this.handleInputChange} />
                </label>
                <br />
                <button type="submit">Login</button>
                {loginError && <p>{loginError}</p>}
                {userInfoError && <p>{userInfoError}</p>}
            </form>
        );
    }
}

export default Login;

