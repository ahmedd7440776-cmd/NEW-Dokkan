import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    user: null, // countans user's info whither if its authenticated or just a geast
    isAuthenticated: false,

    // 1- login function
    login: (userData) =>
      set({
        user: userData,
        isAuthenticated: true,
      }),

    // 2- logout
    logout: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),

    name: "auth-storage",

  })),
);





// ((((((secand way to save the data of the users))))))
// ((((((secand way to save the data of the users))))))




// import Cookies from "js-cookie";
// import { User } from "lucide-react";


// // reading user's data that its been lready existed in cookies if it exists
// const savedUser  = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null


// export const useAuthStore = create((set) => ({
//   User: savedUser,
//   isAuthenticated: !!savedUser,  // its gonna be true if there is a user


//   login: (userData)=> {
//     //  save users data for 7 days
// Cookies.set('user' , JSON.stringify(userData) , { expires: 7 , path: '/'})
// set({
//   user: userData, 
//   isAuthenticated: true,
// })
//   },



//   logout: ()=> {
// Cookies.remove('user' , {path: '/'})
// set({
//   user: null,
//   isAuthenticated : false
// })
//   }
// }));
