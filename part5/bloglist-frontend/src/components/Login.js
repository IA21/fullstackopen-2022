const Login = ({ username, password, setUsername, setPassword, loginSubmit }) => {
    return (
        <form>
            <label>username <input type='text' value={username} onChange={({ target }) => { setUsername(target.value) }} autoFocus /></label>
            <br />
            <label>password <input type='password' value={password} onChange={({ target }) => { setPassword(target.value) }} /></label>
            <br />
            <button onClick={loginSubmit}>login</button>
        </form>
    )
}

export default Login
