// import { FaPhone, FaEnvelope } from "react-icons/fa"; // Assuming you're using react-icons

// export default function Contact() {
//   return (
//     <div className="h-full flex items-center justify-center">
//       <div className="text-center contactcard p-8 rounded-lg shadow-lg">
//         <h1 className="text-4xl text-white font-bold mb-8">Contact</h1>
//         <div className="flex items-center justify-center gap-2">
//           <FaPhone className="text-slate-300" />
//           <a href="tel:+212700161503" className="text-slate-300 font-bold hover:text-green-500 transition-colors">
//             +212700161503
//           </a>
//         </div>
//         <div className="flex items-center justify-center gap-2 mt-2">
//           <FaEnvelope className="text-slate-300" />
//           <a href="mailto:elmaarpro@gmail.com" className="text-slate-300 font-bold hover:text-green-500 transition-colors">
//             elmaarpro@gmail.com
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function Contact() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center contactcard p-8 rounded-lg shadow-lg shadow-green-700 ">
        <h1 className="text-4xl text-indigo-700 font-bold mb-8">Contact</h1>

        <div className="grid grid-cols-1">
          <a className="text-slate-900 font-bold mr-4 hover:text-green-500 transition-colors">
            +212700161503
          </a>
          <a
            href="tel:+212700161503"
            className="text-slate-300 font-bold hover:text-green-500 transition-colors"
          >
            <img className="w-40" src="/phonee.svg" alt="" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-y-2">

       
        <a
          
          className="text-slate-900 font-bold hover:text-green-500 transition-colors"
        >
          elmaarpro@gmail.com
        </a>

        <a
          href="mailto:elmaarpro@gmail.com"
          className="text-slate-900 font-bold mx-auto hover:text-green-500 transition-colors"
        >
          <img className="w-28" src="/mailicon.svg" alt="" />
        </a>
        </div>
      </div>
    </div>
  );
}
