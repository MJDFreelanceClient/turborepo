export const Questions = ({questions, setQuestions}:{questions:string[], setQuestions:(questions:string[])=>void}) => {
    const upsertQuestion = (question: string, index: number) => {
        const newQuestions = [...questions];
        newQuestions[index] = question;
        setQuestions(newQuestions);
    }

    return (
        <div className={`flex flex-col gap-6`}>
            {questions.map((question, index) => (
                <input key={index} value={question} onChange={(e) => upsertQuestion(e.target.value, index)} />
            ))}
            <button className={`w-fit`} onClick={() => setQuestions([...questions, ""])}>Add Question</button>
        </div>
    );
};