import { Link } from 'react-router-dom';

const Button = ({ text, href, onClick }) => {
  const colour = href == 'new' ? 'green' : 'red';
  return (
    <Link
      to={`profile/${href}`}
      className='mt-2 mx-2'
      onClick={onClick}
    >
      <button
                  className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-${colour}-500 rounded-md hover:bg-${colour}-700 focus:outline-none focus:bg-${colour}-700'
                  type='button`}
                >
                  {text}
                </button>
    </Link>
  );
};
export default Button;
