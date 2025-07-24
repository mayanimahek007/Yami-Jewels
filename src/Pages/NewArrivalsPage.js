import React from 'react';
import './newArrivals.css'; // Ensure you have the appropriate CSS file
import { IoDiamond } from 'react-icons/io5';
const categories = [
  {
    name: 'Rings',
    img: require('../assets/images/ring.jpg'),
  },
  {
    name: 'Pendants',
    img: require('../assets/images/pen1.png'),
  },
  {
    name: 'Earrings',
    img: require('../assets/images/ear.png'),
  },
];

const NewArrivalsPage = () => {
  return (
    <div className="min-h-screen bg-[#fdf8f8] flex flex-col items-center py-10">
      <div className="w-full flex flex-col items-center justify-center mb-4 relative">
        <img src={require('../assets/images/image.png')} alt="New Arrivals Banner" className="w-full h-[440px] object-cover mb-4" />
        <div className="w-full flex flex-col justify-center pl-16 text-white absolute top-0 left-0 h-full">
          <div className='flex items-center justify-start gap-3'>

          <h1 className="text-5xl font-playfair font-bold mb-4 drop-shadow-lg">New Arrivals</h1>
          <span className="bg-white text-gray-800 text-base px-4 py-1 rounded-full ml-3 font-medium banr"><IoDiamond color='#48182E' size={20}/> 500+ New Items</span>
          </div>
          <p className="text-lg font-medium mb-2 drop-shadow">New Arrivals Dropping Daily, Monday through Friday.</p>
          <p className="text-md font-normal drop-shadow">Explore the Latest Launches Now!</p>
        </div>
        <div className="absolute left-1/2 bottom-[-120px] transform -translate-x-1/2 w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <div key={cat.name} className="bg-[#fdf8f8] rounded-2xl overflow-hidden relative flex items-end h-[320px]">
                <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover p-2 rounded-2xl" />
                {/* <div className="relative z-10 p-6">
                  <h2 className="text-base font-playfair font-semibold text-white drop-shadow-lg">{cat.name}</h2>
                </div> */}
                <div className="absolute inset-0 bg-gradient-to-t to-transparent z-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;
