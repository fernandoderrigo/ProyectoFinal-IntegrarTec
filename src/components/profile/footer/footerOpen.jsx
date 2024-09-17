'use client';

import { useState } from "react";
import NavBar from '@/components/common/navigation-bar/NavigationBar';
import Reproduction from '@/components/common/reproduction/Reproduction';

export default function FooterOpen({navBarVisibility}) {
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  const setNavBarVisibility = () => {
    return navBarVisibility ? 'hidden' : ''
  };

  return (
    <footer className="col-span-4">
      <Reproduction setNavBarVisibility={setNavBarVisibility} />
       <NavBar className={setNavBarVisibility} />
    </footer>
  );
}