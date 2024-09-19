// import useAuthMutation from "./useAuthMutation";
// import { revalidateAuth } from "@/http/auth";
// import { useAuth } from "@/context/AuthContext";
// import { useEffect } from "react";
// import isAuthenticated from "@/helpers/isAuthenticated";

// const useAuthRevalidate = () => {
//     const { auth, handleAuth } = useAuth();

//     let token = '';

//     if (typeof window !== 'undefined') {
//         token = localStorage.getItem('token') as string;
//     }

//     const { mutate: revalidateUser } = useAuthMutation(revalidateAuth, {
//         onSuccess: (response: any) => {
//             if (response.status === 200) {
//                 handleAuth(response.data);
//                 return;
//             }
//         },
//         onError: ({ response }: any) => {
//             if (response.data.message) {
//                 if (typeof window !== 'undefined') {
//                     localStorage.removeItem('token');
//                 }
//                 console.log(response.data.message, 'from the useAuthRevalidate hook');
//                 return;
//             }
//         },
//     });

//     useEffect(() => {
//         // only runs when user is not in context meaning there's been a refresh of the browser or change of tab
//         if (!auth && isAuthenticated(token)) {
//             revalidateUser({ token });
//         }
//     }, [auth, token, revalidateUser]);

//     return { revalidateUser, token };
// };

// export default useAuthRevalidate;

// useAuthRevalidate is a custom hook designed to revalidate the authentication of a user,
// typically in scenarios where there's a refresh of the browser or a change of tab.
// It performs revalidation by sending the user's token to an authentication endpoint to confirm
// if it's valid and updates the authentication context accordingly.

// revalidateAuth: An HTTP function for revalidating the user's authentication.

// useAuth: A context hook that retrieves the current authentication state and a function to update it.
// isAuthenticated: A helper function that checks if the provided token indicates a valid authentication state.

// This is useful for refreshing the session or when there's a browser tab change,
// ensuring the user's token is still valid and authenticated.

// In summary, useAuthRevalidate is designed to maintain authentication state by revalidating user sessions when needed,
// particularly after browser refreshes or tab changes. 
// It works with an auth context, local storage for storing tokens, and custom mutation logic for revalidation requests.
// The logic ensures a user’s authentication remains consistent across sessions.