export default function NotLoggedIn() {

    return (
        <>
            <h1>You are not logged in!</h1>
            <h1>Please login! or Sign Up</h1>
            <a href={"/login"}><button>To Login</button></a>
            <a href={"/signup"}><button>Sign Up</button></a>
        </>
    );

}