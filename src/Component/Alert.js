import React from 'react';

export default function Alert({ message, type }) {
    return (
        <>
            {message && (
                <div
                    className={`alert alert-${type} position-fixed top-50 start-50 translate-middle text-center shadow`}
                    role="alert"
                    style={{ zIndex: 1050, minWidth: "300px", maxWidth: "80vw" }}
                >
                    {message}
                </div>
            )}
        </>
    );
}
