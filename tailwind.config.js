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
        'h-package': '645px'
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
        'custom-blue-hover-sidebar': '#1C4C74'
      },
      backgroundImage: {
        'ninhvan': "url('https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/458695682_1949769048769217_1337550317926893731_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-yGQvEM8UrYQ7kNvgEYLr_B&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=AmeWstaLZqVFVjxC8fGYyF9&oh=00_AYDrIfBGOG6tjohoGrR6WgCsdb4p5ac6NlJHPIdESW4bjA&oe=673501E5')", 
        'bgsignin': "url('https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/459368859_1954583321621123_4504985679253766720_n.jpg?stp=dst-jpg_p526x296&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEsBf99JUFPr7bnaNmK7uGVTpJOClJ7kVdOkk4KUnuRV3lUETciYH33_e0udy1dKsM1PJHm_-yxSdcpcn696HYX&_nc_ohc=12aThnS8KoAQ7kNvgFXlSC9&_nc_ht=scontent.fsgn2-10.fna&_nc_gid=Ax_0LO2-fjW_eWUY0Sni2qQ&oh=00_AYB2UIW2IYAJUr_-8hAy8dq-EcWEnYZnJ54ZntyzrSSNlQ&oe=66E7B493')"
      },
    },
  },
  plugins: [],
}