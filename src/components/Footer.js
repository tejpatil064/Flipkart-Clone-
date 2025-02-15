import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">About</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#">Contact Us</Link>
            </li>
            <li>
              <Link to="#">About Us</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">Flipkart Stories</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Help</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#">Payments</Link>
            </li>
            <li>
              <Link to="#">Shipping</Link>
            </li>
            <li>
              <Link to="#">Cancellation & Returns</Link>
            </li>
            <li>
              <Link to="#">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Policy</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#">Return Policy</Link>
            </li>
            <li>
              <Link to="#">Terms Of Use</Link>
            </li>
            <li>
              <Link to="#">Security</Link>
            </li>
            <li>
              <Link to="#">Privacy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Social</h3>
          <ul className="space-y-2">
            <li>
              <Link to="#">Facebook</Link>
            </li>
            <li>
              <Link to="#">Twitter</Link>
            </li>
            <li>
              <Link to="#">YouTube</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
