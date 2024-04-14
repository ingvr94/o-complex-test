import React from 'react'
import parse from 'html-react-parser'

function ReviewCart({text}) {
  return (
    <div className='text-black md:pt-5 pt-[23.5px] md:pl-[27px] pl-[19.15px] rounded-rounded-15 bg-tranparent-grey md:w-[486px] w-[332px] md:h-[611px] h-[685px]'>
        <div className=''>{parse(text)}</div>
    </div>
  )
}

export default ReviewCart