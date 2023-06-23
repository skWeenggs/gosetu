import React from 'react'
import { Carousel } from '@mantine/carousel';

const MainHome = () => {
  return (
    <div>
    <h1 className='sm:text-3xl text-center my-5'>Master Marketing Website</h1>
    <Carousel
    // className='m-auto'
        
      withIndicators
      mx="auto"
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      maw={"80%"}
      align="start"
    
      breakpoints={[
        { maxWidth: 'md', slideSize: '50%' },
        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
      ]}
    >
      <Carousel.Slide className='bg-red-200'>1</Carousel.Slide>
      <Carousel.Slide className='bg-gray-200'>2</Carousel.Slide>
      <Carousel.Slide className='bg-blue-200'>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>

    </div>
  )
}

export default MainHome