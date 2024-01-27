import { useSetRecoilState } from 'recoil';
import { modalContentAtom } from '../atoms/modalContent';

const Backdrop = ({ children }) => {
  const setModalContent = useSetRecoilState(modalContentAtom);

  const closeModal = (e) => {
    e.preventDefault();
    setModalContent({});
  };
  return (
    <div
      className='flex h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center backdrop-blur-sm'
      onClick={closeModal}
    >
      {children}
    </div>
  );
};
export default Backdrop;
