import { useState } from 'react'
import Header from './components/Header'
import Input from './components/Input'
import Results from './components/Results'
import Edit from './components/Edit'


function App() {
  
  return (
    <div className='max-h-[500px] min-h-[500px]'>
      <Header />
      <div className='grid gap-2 lg:grid-rows-1 lg:grid-cols-2'>
        <div>
          <Input className="row-span-2" />
        </div>
        <Results className="row-span-2" />
      </div>
      
    </div>
  )
}

export default App
