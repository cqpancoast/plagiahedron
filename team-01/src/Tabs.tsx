import React, { ReactElement, useState } from "react"
import TabTitle from "./TabTitle";
import './FileCloseup.css';

/**
 * Tabs code from 
 * https://medium.com/weekly-webtips/create-basic-tabs-component-react-typescript-231a2327f7b6
 */

type Props = {
  children: ReactElement[]
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <div>
      <ul>
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      <div className="FileCloseup-box">
        {children[selectedTab]}
      </div>
    </div>
  )
}

export default Tabs;