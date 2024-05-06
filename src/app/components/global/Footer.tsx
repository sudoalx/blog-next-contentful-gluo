import Link from "next/link";
import { Logo } from "../branding/Logo";
import { BiPhoneCall } from "react-icons/bi";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { fetchFooter } from "@/contentful/lib/siteFooter";

export const Footer = async () => {
  const footerContent = await fetchFooter();
  console.log(footerContent);
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto py-8 flex justify-between items-center flex-col md:flex-row gap-6 text-center md:text-left">
        <div>
          <h4 className="text-xl mb-4">{footerContent.firstColTitle}</h4>
          <div className="mb-4 flex items-center gap-4">
            <a href={footerContent.instagram} target="_blank" rel="noreferrer">
              <FaInstagram className="inline-block text-3xl text-red-500" />
            </a>
            <a href={footerContent.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedinIn className="inline-block text-3xl text-blue-500 " />
            </a>
            <a href={footerContent.youtube} target="_blank" rel="noreferrer">
              <FaYoutube className="inline-block text-3xl text-red-500 " />
            </a>
          </div>
        </div>

        <div className="text-base">
          <h4 className="text-xl">{footerContent.secondColTitle}</h4>
          <p>
            <b>CDMX:</b> WeWork, Miguel de Cervantes Saavedra 169, Granada,
            11520, Miguel Hidalgo.
          </p>
          <p>
            <b>Monterrey:</b> WeWork, Av. Constitución 2050 Floor 38, 64000. MX
          </p>

          <p className="my-2  hover:text-gray-600 transition duration-300 ease-in-out">
            <BiPhoneCall className="inline-block" />
            <a href={`tel:${footerContent.phoneNumber}`} className="ml-2">
              <b>+52 55 4163 5960</b>
            </a>
          </p>

          <p className="text-gray-600">Made with ❤️ in MTY</p>
        </div>

        <div>
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>
      </div>
    </footer>
  );
};
