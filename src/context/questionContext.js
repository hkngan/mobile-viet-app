import React, {createContext, useState} from "react";

const QuestionContext = createContext()

const QuestionProvider = ({children}) => {
    const [answerChecked, setAnswerChecked] = useState(false)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

    const value = {
        answerChecked, 
        setAnswerChecked,
        currentQuestionIndex,
        setCurrentQuestionIndex
    }
    return (
        <QuestionContext.Provider value={value}>
            {children}
        </QuestionContext.Provider>
    )
}
export {QuestionContext, QuestionProvider}