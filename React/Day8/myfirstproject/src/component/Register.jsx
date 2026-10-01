const Register =()=>{
   return( <>
    <div>
        <h1>Create Account</h1>
        
            <form><div>
                <label>Full Name</label>
                <input type="text" 
                placeholder="Enter your Name" /></div>
                <div><label>Email</label>
                <input type="email"
                placeholder="Enter your email"/></div>
                 <div><label>Password</label>
                <input type="password"
                placeholder="Enter your Password"/></div>
                 <div><label>Confirm Password</label>
                <input type="password"
                placeholder="Confirm your Password"/></div>
                <button type='submit'>Register</button></form>
                <p>Already have an account?<span>Login</span></p>
                </div>
                </>);
};
export default Register;