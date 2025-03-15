import { Button } from '@/components/ui/button'
import React from 'react'

const SliderSection = () => {
  return (
    <div className='bg-darklila'>
      <div className='flex flex-col gap-4 bg-white w-100 h-100'>
      <Button color="default" size="default">More About Us</Button>
     <Button color="green">Baby Area</Button>
     <Button color="orange" size="lg">Book A Party</Button>
     <Button color="yellow" size="lg">Book A Party</Button>
     <Button color="purple" size="lg">Book A Party</Button>
      </div>

    </div>
  )
}

export default SliderSection