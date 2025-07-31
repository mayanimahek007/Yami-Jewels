import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import headerLogo from "../../assets/images/headerlogo.svg";
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { PiHandbag, PiUser } from 'react-icons/pi';
import { RiAdminLine } from 'react-icons/ri';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const navigate = useNavigate();
    const { currentUser, logout, isAdmin } = useAuth();
    const accountMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
                setShowAccountMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpen = () => {
        setOpenMenu(true);
    };

    const handleClose = () => {
        setOpenMenu(false);
    };

    const handleCategoryClick = () => {
        navigate('/product');
        handleClose();
    };

    return (
        <>
            <div className='bg-[#48182E]  sticky top-0 z-20' >
                <div className='container sm:px-10 px-5 h-full pb-5' >
                    <div className='xl:block hidden'>
                        <div className='flex items-center justify-between h-full'>
                            <div>
                                <img src={headerLogo} alt='...' className='h-[92px] w-[178px] cursor-pointer' onClick={() => navigate('/')} />
                            </div>
                            <div className="relative w-96">
                                <CiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-3 py-1.5 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-black text-black"
                                />
                            </div>
                            <div className='text-white flex items-center justify-center gap-5'>
                                {currentUser ? (
                                    <Link to="/wishlist">
                                        <CiHeart size={25} className="cursor-pointer" />
                                    </Link>
                                ) : (
                                    <CiHeart size={25} className="cursor-pointer" onClick={() => navigate('/login')} />
                                )}
                                <div className="relative" ref={accountMenuRef}>
                                    <PiUser size={25} className="cursor-pointer" onClick={() => setShowAccountMenu(!showAccountMenu)} />
                                    <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${showAccountMenu ? 'block' : 'hidden'}`}>
                                        {currentUser ? (
                                            <>
                                                {isAdmin && (
                                                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                                                        <RiAdminLine className="mr-2" /> Admin Dashboard
                                                    </Link>
                                                )}
                                                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Profile
                                                </Link>
                                                <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Wishlist
                                                </Link>
                                                <Link to="/update-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Update Password
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        logout();
                                                        navigate('/');
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Login
                                                </Link>
                                                <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                    Register
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* <PiHandbag size={25} className="cursor-pointer" /> */}
                            </div>
                        </div>
                        <div className='flex items-center 2xl:gap-[50px] xl:gap-8 gap-5 text-white w-fit mx-auto uppercase text-base font-semibold cursor-pointer'>
                            <p onClick={handleCategoryClick}>Engagement</p>
                            <p onClick={handleCategoryClick}>Wedding</p>
                            <p onClick={handleCategoryClick}>Jewelary</p>
                            <p onClick={handleCategoryClick}>Gifts</p>
                            <p onClick={() => navigate('/custom-jewellery')}>Custom Jewellery</p>
                        </div>
                    </div>
                    <div className='xl:hidden block'>
                        <div className='flex items-center justify-between h-full'>
                            <FaBars className='text-white w-6 h-6' onClick={() => handleOpen()} />
                            <img src={headerLogo} alt='...' className='sm:w-40 w-32 h-24 object-cover cursor-pointer' />
                            <div className='text-white flex items-center justify-center gap-3'>
                                {currentUser ? (
                                    <Link to="/wishlist">
                                        <CiHeart size={25} />
                                    </Link>
                                ) : (
                                    <CiHeart size={25} onClick={() => navigate('/login')} />
                                )}
                                <PiHandbag size={25} />
                            </div>
                        </div>
                        <div className="relative w-full ">
                            <CiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-3 py-1.5 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-black text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* sidebar mobile screen */}
            {openMenu && (<div className='fixed inset-0 bg-[#0000004D] lg:hidden  backdrop-blur-sm cursor-pointer z-10' onClick={() => handleClose()}></div>)}
            <div className={`fixed top-0 left-0 h-full bg-[#3a0f21f2] shadow-lg transform transition-transform duration-500 ease-in-out lg:hidden sm:w-96 w-72 z-20 overflow-y-auto ${openMenu ? "translate-x-0" : "-translate-x-full"}`}>
                <div className='p-6'>
                    <div className='mb-6 flex items-center justify-between'>
                        <img src={headerLogo} alt='...' className='sm:w-40 w-32 h-24 object-cover cursor-pointer' onClick={() => {
                            handleClose();
                        }} />
                        <IoClose className='w-7 h-7 text-white' onClick={() => handleClose()} />
                    </div>
                    <div className='flex flex-col gap-6 text-white text-base font-semibold'>
                        <p className=" " onClick={handleCategoryClick}>Engagement</p>
                        <p className=" " onClick={handleCategoryClick}>Wedding</p>
                        <p className=" " onClick={handleCategoryClick}>Jewelary</p>
                        <p className=" " onClick={handleCategoryClick}>Gifts</p>
                        <p onClick={() => navigate('/custom-jewellery')}>Custom Jewellery</p>

                        {currentUser ? (
                            <>
                                {isAdmin && (
                                    <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                        navigate('/admin');
                                        handleClose();
                                    }}>
                                        <RiAdminLine size={25} />
                                        <p>Admin Dashboard</p>
                                    </div>
                                )}
                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                    navigate('/profile');
                                    handleClose();
                                }}>
                                    <PiUser size={25} />
                                    <p>Profile</p>
                                </div>
                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                    navigate('/wishlist');
                                    handleClose();
                                }}>
                                    <CiHeart size={25} />
                                    <p>Wishlist</p>
                                </div>
                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                    navigate('/update-password');
                                    handleClose();
                                }}>
                                    <PiUser size={25} />
                                    <p>Update Password</p>
                                </div>
                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                    logout();
                                    navigate('/');
                                    handleClose();
                                }}>
                                    <PiUser size={25} />
                                    <p>Logout</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                    navigate('/login');
                                    handleClose();
                                }}>
                                    <PiUser size={25} />
                                    <p>Login</p>
                                </div>
                                <div className='flex items-center gap-1 cursor-pointer' onClick={() => {
                                    navigate('/register');
                                    handleClose();
                                }}>
                                    <PiUser size={25} />
                                    <p>Register</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Header;