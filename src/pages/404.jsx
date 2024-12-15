import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <div className="flex justify-center min-h-screen items-center flex-col">
            <h1 className="text-3xl font-bold mb-2 text-blue-600">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>{error.statusText || error.message}</p>
        </div>
    );
};


export default ErrorPage;