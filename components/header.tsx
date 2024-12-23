'use client';

import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React from 'react';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';
import useBasketStore from '@/store/store';
import Image from 'next/image';
import Logo from '@/public/glowCircle.png';

const Header = () => {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  console.log(user);

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className=" flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:opacity-50 cursor-pointer mx-auto sm:mx-0"
        >
          <Image src={Logo} alt="tgs-logo" className="w-12 h-12" />
        </Link>

        {/* Next 15 gives you auto query = http://localhost:3000/search?query=page as part of the Form component */}
        <Form
          className="w-full sm-w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
          // need this to hit page route
          action={'/search'}
        >
          <input
            className="bg-gray-200 text-gray-800 px-4 py-2 tounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            type="text"
            // need this for query params
            name="query"
            placeholder="Search for products"
          />
        </Form>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 md:flex-none">
          <Link
            className="flex flex-1 relative justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded"
            href={'/basket'}
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span>My Basket</span>
          </Link>

          {/* User area */}
          <ClerkLoaded>
            {user && (
              <Link
                href={'/orders'}
                className="flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            )}
            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}!</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
            {user?.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
