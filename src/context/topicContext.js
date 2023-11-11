import React, { createContext, useState } from 'react';

const TopicContext = createContext()

const TopicProvider = ({children}) => {
    const [topic, setTopic] = useState('')
    return (
        <TopicContext.Provider
          value={{
            topic,
            setTopic
          }}
        >
          {children}
        </TopicContext.Provider>
      );
    };
    
    export {TopicProvider, TopicContext  };