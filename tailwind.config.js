/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'h-landing-child': '900px',
        'discover-img-h': '450px',
        'logo-300-h': '300px',
        'h-search': '50px',
        'h-landing-child-1': '980px',
        'h-utility-image': '220px',
        'h-landing-child-2': '1200px',
        'h-landing-child-3': '700px',
        'h-landing-child-4': '900px',
        'h-recommend-img': '250px',
        'h-recommend-card': '470px',
        'h-recommend-card-dive': '600px',
        'h-package': '645px',
        'h-cover-photo': '100px',
        'h-image-blog': '150px'
      },
      width: {
        'discover-img-w': '400px',
        'logo-300-w': '300px',
        'w-search': '700px',
        'w-utility-image': '470px',
        'w-recommend-img': '330px'
      }
      ,
      colors: {
        'custom-blue': '#345167', // Thêm màu tùy chỉnh
        'custom-blue-text': '#354551',
        'custom-blue-hover-sidebar': '#1C4C74',
        'soft-pink': 'rgba(250, 230, 217, 1)',
      },
      backgroundImage: {
        'ninhvan': "url('https://unwinds.s3.ap-southeast-2.amazonaws.com/1731302849091_458695682_1949769048769217_1337550317926893731_n.jpg')", 
        'bgsignin': "url('https://unwinds.s3.ap-southeast-2.amazonaws.com/1731302913286_bgSignInSignUp.png')"
      }, typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#333',
            },
          },
        },
      },
    },
  },
  plugins: [],
}