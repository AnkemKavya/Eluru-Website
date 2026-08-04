import "./SavedAddresses.css";

import {
   HiOutlineHome,
    HiOutlineOfficeBuilding,
    HiOutlinePencil,
    HiOutlineTrash,
    HiOutlineLocationMarker
  
} from "react-icons/hi";

export default function SavedAddresses({
addresses,
    selectedAddress,
    onSelect,
    setAddresses,
    onAddNew
}) {
   const deleteAddress=(id)=>{

        const updated=
            addresses.filter(item=>item.id!==id);

        setAddresses(updated);

        localStorage.setItem(
            "addresses",
            JSON.stringify(updated)
        );

    };
  return (
     <>

            <button

                className="add-address-btn"

                onClick={onAddNew}

            >

                + Add Address

            </button>

            <h2 className="saved-title">

                Saved Addresses

            </h2>

            {

                addresses.map(item=>(

                    <div
                        className="saved-card"
                        key={item.id}
                    >

                        <div className="saved-left">

                            <input

                                type="radio"

                                checked={
                                    selectedAddress?.id===item.id
                                }

                                onChange={()=>onSelect(item)}

                            />

                            <div>

                                <h3>

                                    {

                                        item.type==="Office"

                                        ?

                                        <HiOutlineOfficeBuilding/>

                                        :

                                        <HiOutlineHome/>

                                    }

                                    {item.type}

                                </h3>

                                <h4>

                                    {item.fullName}

                                </h4>

                                <p>

                                    <HiOutlineLocationMarker/>

                                    {item.address},{" "}

                                    {item.city} - {item.pincode}

                                </p>

                            </div>

                        </div>

                        <div className="saved-right">

                            <button>

                                <HiOutlinePencil/>

                            </button>

                            <button

                                onClick={()=>deleteAddress(item.id)}

                            >

                                <HiOutlineTrash/>

                            </button>

                        </div>

                    </div>

                ))

            }

        </>

    );

}
//     <div className="saved-addresses">

//       {/* Add Address */}

//       <button
//         className="new-address-btn"
//         onClick={onAddNew}
//       >
//         + Add Address
//       </button>

//       {/* Saved Addresses */}

//       {addresses.length > 0 && (
//         <>
//           <h2>Saved Addresses</h2>

//           {addresses.map((item) => (

//             <div
//               key={item.id}
//               className="saved-card"
//             >

//               <div className="saved-card-header">

//                 <div className="saved-type">

//                   {item.type === "Office" ? (
//                     <HiOutlineOfficeBuilding />
//                   ) : (
//                     <HiOutlineHome />
//                   )}

//                   <span>{item.type}</span>

//                 </div>

//                 <div className="saved-actions">

//                   <button
//                     className="icon-btn"
//                     onClick={() => onEdit(item)}
//                   >
//                     <HiOutlinePencil />
//                   </button>

//                   <button
//                     className="icon-btn delete"
//                     onClick={() => onDelete(item.id)}
//                   >
//                     <HiOutlineTrash />
//                   </button>

//                 </div>

//               </div>

//               <div className="saved-info">

//                 <h4>{item.fullName}</h4>

//                 <p>
//                   <HiOutlineLocationMarker />
//                   {item.address}
//                 </p>

//                 {item.landmark && (
//                   <p>{item.landmark}</p>
//                 )}

//                 <p>
//                   {item.city} - {item.pincode}
//                 </p>

//               </div>

//               <button
//                 className="use-btn"
//                 onClick={() => onSelect(item)}
//               >
//                 <HiOutlineCheck />
//                 Use Address
//               </button>

//             </div>

//           ))}
//         </>
//       )}

//     </div>
//   );
// }