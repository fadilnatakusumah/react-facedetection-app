import React from 'react'


const Navigation = ({ onRouteChange, isSignin }) => {
    if (!isSignin) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim ba ph3 pv2 mb2 dib near-black pointer">Sign in</p>
                <p onClick={() => onRouteChange('register')} className="f3 link dim ba ph3 pv2 mb2 dib near-black pointer">Register</p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f3 link dim ba ph3 pv2 mb2 dib near-black pointer">Sign out</p>
            </nav>
        );
    }



}


export default Navigation;