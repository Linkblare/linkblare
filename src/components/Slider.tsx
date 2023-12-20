'use client'
import React from 'react'
import SlickSlider, { Settings } from 'react-slick'

const Slider = ({
    settings,
    children
}: {
    settings: Settings
    children: React.ReactNode
}) => {
  return (
    <SlickSlider {...settings}>
        {children}
    </SlickSlider>
  )
}

export default Slider