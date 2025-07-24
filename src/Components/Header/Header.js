import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogo from "../../assets/images/headerlogo.svg";
import { FaBars } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { PiHandbag, PiUser } from 'react-icons/pi';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navigate = useNavigate();

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
                                <img src={headerLogo} alt='...' className='h-[92px] w-[178px] cursor-pointer' onClick={()=>navigate('/')}/>
                            </div>
                            <div className="relative w-96">
                                <CiSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-3 py-1.5 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black placeholder-black text-black"
                                />
                            </div>
                            <div className='text-white flex items-center justify-center gap-3'>
                                <CiHeart size={25} />
                                <PiUser size={25} />
                                <PiHandbag size={25} />
                            </div>
                        </div>
                        <div className='flex items-center 2xl:gap-[50px] xl:gap-8 gap-5 text-white w-fit mx-auto uppercase text-base font-semibold cursor-pointer'>
                            <p onClick={handleCategoryClick}>Engagement</p>
                            <p onClick={handleCategoryClick}>Wedding</p>
                            <p onClick={handleCategoryClick}>Jewelary</p>
                            <p onClick={handleCategoryClick}>Share With US</p>
                            <p onClick={handleCategoryClick}>Gifts</p>
                            <p onClick={handleCategoryClick}>Diamond Education</p>
                        </div>
                    </div>
                    <div className='xl:hidden block'>
                        <div className='flex items-center justify-between h-full'>
                            <FaBars className='text-white w-6 h-6' onClick={() => handleOpen()} />
                            <img src={headerLogo} alt='...' className='sm:w-40 w-32 h-24 object-cover cursor-pointer' />
                            <div className='text-white flex items-center justify-center gap-3'>
                                <CiHeart size={25} />
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
                        <p className=" " onClick={handleCategoryClick}>Share With US</p>
                        <p className=" " onClick={handleCategoryClick}>Gifts</p>
                        <p className=" " onClick={handleCategoryClick}>Diamond Education</p>
                        <div className='flex items-center gap-1'>
                            <PiUser size={25} />
                            <p>Log In</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Header;