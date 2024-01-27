import { atom, selector } from 'recoil';

export const modalContentAtom = atom({
  key: 'modalContentAtom',
  default: {},
});

export const isModalActiveSelector = selector({
  key: 'isModalActiveSelector',
  get: ({ get }) => {
    const modalContent = get(modalContentAtom);
    if (!modalContent.user) {
      return false;
    }
    return true;
  },
});
