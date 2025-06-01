import React from 'react';
import {Outlet} from "react-router";

function Auth(props) {
    return (
        <div className="flex items-center justify-center h-screen">
           <Outlet/>
        </div>
    );
}

export default Auth;