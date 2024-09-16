import { IoIosCloseCircleOutline } from 'react-icons/io';

export default function HeaderProfile() {
  return (
    <header className="grid grid-cols-3 gap-4 basic-header bg-gradient-to-b from-indigo-500 justify-items-center pt-7 pb-5">
      <picture className='col-start-1 p-3 w-11/12< aspect-square overflow-hidden rounded-full '>
        <img className='object-cover w-full aspect-square rounded-full border-4 border-black' src="https://i.scdn.co/image/ab67fb8200005caf474a477debc822a3a45c5acb" alt="" />
      </picture>
      <button className='col-start-3 justify-self-end place-self-start mr-10 mt-5'>
        <IoIosCloseCircleOutline className='basic-button' />
      </button>
    </header>
  );
}
