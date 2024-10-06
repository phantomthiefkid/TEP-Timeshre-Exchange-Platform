import React from 'react';

const Partner = () => {
    return (
        <div className='py-14'>
            <h1 className='text-center text-5xl font-semibold text-gray-700'>Đối tác của Unwind</h1>
            <div className='mt-10 px-4 md:px-10'>
                <div className='space-y-10'>
                    {/* Row 1 with 4 images, centered */}
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-4 gap-4 max-w-6xl w-full'>
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 1" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 2" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 3" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 4" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                        </div>
                    </div>

                    {/* Row 2 with 3 images, centered */}
                    <div className='flex justify-center '>
                        <div className='grid grid-cols-3 gap-4 max-w-6xl w-2/3 px-32'>
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 5" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 6" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 7" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                        </div>
                    </div>

                    {/* Row 3 with 4 images, centered */}
                    <div className='flex justify-center'>
                        <div className='grid grid-cols-4 gap-4 max-w-6xl w-full'>
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 8" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 9" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 10" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                            <img src="https://trao.com.vn/wp-content/uploads/2019/08/logo-vinpearl.jpg" alt="Partner 11" className='w-full h-auto object-contain border rounded-2xl shadow-xl' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Partner;
