// import React from "react";

// const App = () => {

// //   // 1. Without Promise - Callback Function
// //   const getDataCallback = (callback) => {
// //     setTimeout(() => {
// //       const data = {
// //         name: "Dharan",
// //         role: "Frontend Developer"
// //       };

// //       callback(data);
// //     }, 2000);
// //   };

// //   const handleCallback = () => {
// //     getDataCallback((data) => {
// //       console.log("Callback Data:", data);
// //     });
// //   };

// //   // 2. With Promise - then() and catch()
// //   const getDataPromise = () => {
// //     return new Promise((resolve, reject) => {
// //       setTimeout(() => {
// //         const data = {
// //           name: "Dharan",
// //           role: "Frontend Developer"
// //         };

// //         resolve(data);
// //       }, 2000);
// //     });
// //   };

// //   const handlePromise = () => {
// //     getDataPromise()
// //       .then((data) => {
// //         console.log("Promise Data:", data);
// //       })
// //       .catch((error) => {
// //         console.log("Error:", error);
// //       });
// //   };

// //   return (
// //     <div>
// //       <h1>Callback and Promise Example</h1>

// //       <button onClick={handleCallback}>
// //         Get Data Without Promise
// //       </button>

// //       <br />
// //       <br />

// //       <button onClick={handlePromise}>
// //         Get Data With Promise
// //       </button>
// //     </div>
// //   );
// // };

// // export default App;
