import React from 'react'

const About = () => {
  return (
    <div className='bg-blue-100 flex flex-col items-center justify-center gap-4 h-screen w-screen'>
<div className="p-6 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold mb-4">🌦️ About This App</h2>
  <p className="mb-4">
    This is a <strong>practice weather application</strong> built with <strong>React</strong> and styled using <strong>Tailwind CSS</strong>.
    I’ve used:
  </p>
  <ul className="list-disc list-inside mb-4">
    <li><strong>TanStack Query</strong> for fetching and caching weather data</li>
    <li><strong>React Router DOM</strong> for client-side routing</li>
    <li><strong>React Icons</strong> to add intuitive icons to the UI</li>
  </ul>
  <h3 className="text-xl font-semibold mb-2">🧪 How it works:</h3>
  <p className="mb-4">
    You can type the name of a city in the input field to fetch real-time weather data for that location.
    I’ve also added a <strong>“like” button</strong> so you can save your favorite cities.
    These are stored locally using <strong>LocalStorage</strong>, so they stay even after refreshing the page.
  </p>

  <h3 className="text-xl font-semibold mb-2">👨‍💻 About Me</h3>
  <p className="mb-2">
    I’m <strong>Mikaeel Yaghoobzade</strong>, a passionate <strong>junior front-end developer</strong>.
    You can check out more of my projects on my GitHub page:
  </p>
  <a href="https://github.com/Mikaeel92" target="_blank" className="text-blue-600 underline">
    👉 github.com/mikaeel1992
  </a>
</div>
    </div>
  )
}

export default About