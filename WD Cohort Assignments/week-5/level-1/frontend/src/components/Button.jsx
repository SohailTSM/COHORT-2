import { Link } from "react-router-dom";

const Button = ({ text, href, onClick }) => {
  return (
    <Link
      to={`profile/${href}`}
      className='inline-flex m-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      onClick={onClick}
    >
      {text}
    </Link>
  );
};
export default Button;
