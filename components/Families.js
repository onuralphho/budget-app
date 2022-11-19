import Link from "next/link";
import Image from "next/image";
const Families = (props) => {
  const date = props.family.date.split("T")[0];

  return (
    <div className="CardEffect col-md-4 col-lg-3 border rounded-5 p-3 shadow bg-dark text-white text-center">
      <Image
        src="https://cdn.dribbble.com/users/1853242/screenshots/14785029/media/e5c34d28661f43a280031eabe2a741b0.png"
        className="img-fluid  rounded-4  "
        alt="family picture "
        width={400}
        height={300}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        
      />
      <div className="row p-3 ">
        <h2 className="">{props.family.name}</h2>
        <h5>Members</h5>
        <div className="row text-start overflow-hidden">
        {props.family.members.map((member) => (
          <p key={member}>{member}</p>
        ))}</div>

        <Link href={"/family/"+props.family._id} className="btn btn-primary">
          Details
        </Link>

        <span className=" fst-italic mt-2">Creation Date: {date}</span>
      </div>
    </div>
  );
};

export default Families;
