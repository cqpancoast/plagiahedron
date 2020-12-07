import React, { useCallback } from "react";
import './FileCloseup.css';

type Props = {
  title: string
  index: number
  setSelectedTab: (index: number) => void
}

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index }) => {

  const onClick = useCallback(() => {
    setSelectedTab(index)
  }, [setSelectedTab, index])

  return (
        <button onClick={onClick}>{title}</button>
  )
}

export default TabTitle;