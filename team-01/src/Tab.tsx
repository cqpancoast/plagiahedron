import React from 'react';
import './ProgramCloseup.css';

/**
 * Tab code from 
 * https://medium.com/weekly-webtips/create-basic-tabs-component-react-typescript-231a2327f7b6
 */

type Props = {
  title: string
}

const Tab: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>
}

export default Tab;