import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
  children?: JSX.Element | JSX.Element[];
}

const HomeTemplate = (props: Props) => {

  return (
    <div className='relative overflow-hidden h-screen'>
       {props.children}
    </div>
  )
}

export default HomeTemplate