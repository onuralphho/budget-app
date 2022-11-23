import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/router";
import { useState } from "react";
const FamilyMembers = (props) => {
  const [isDeleting, setIsDeleting] = useState();
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const deleteMemberHandler = async (e) => {
    e.preventDefault();
    setIsDeleting(true);

    const res = await fetch("/api/add-family-member", {
      method: "DELETE",
      body: JSON.stringify({
        familyId: props.familyId,
        email: props.member,
      }),
      headers: { "Content-Type": "application/json" },
    });
    setIsDeleting(false);
    refreshData();
  };

  return (
    <li className=" fs-5 border-bottom p-2" style={{ listStyleType: "none" }}>
      {props.member}
      {props.familyOwner === props.sessionOwner ? (
        isDeleting ? (
          <span className=" ms-3 text-danger spinner-border spinner-border-sm"></span>
        ) : (
          <span
            onClick={deleteMemberHandler}
            className="m-2 text-danger"
            style={{ cursor: "pointer" }}
          >
            <MdDeleteForever size={25} />
          </span>
        )
      ) : null}
    </li>
  );
};

export default FamilyMembers;
