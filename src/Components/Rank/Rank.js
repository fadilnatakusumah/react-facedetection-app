import React from 'react'


const Rank = ({user}) => {
    return (
        <div>
            <div className="f3 white">
                {`Hey ${user.name}, Your current entry is ${user.entries}`}
            </div>
            {/* <div className="f1 white">
                {'3'}
            </div> */}
        </div>
    );
}


export default Rank;