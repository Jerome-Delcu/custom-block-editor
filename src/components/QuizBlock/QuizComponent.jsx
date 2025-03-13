import React, { useState, useEffect } from "react";
import { Radio, Input, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import './style.css'

const QuizComponent = ({ data, onDataChange, readOnly }) => {
  const [quizData, setQuizData] = useState({
    question: data?.question || "Edit me",
    options: data?.options?.length ? data.options : ["Edit me", "Edit me"],
    correctIndex: data?.correctIndex ?? null,
  });

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    onDataChange(quizData);
  }, [quizData]);

  const handleOptionChange = (index) => {
    if (!readOnly) {
      setQuizData({ ...quizData, correctIndex: index });
    } else {
      setSelected(index);
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = quizData.options.filter((_, i) => i !== index);
    setQuizData({
      ...quizData,
      options: newOptions,
      correctIndex: quizData.correctIndex === index ? null : quizData.correctIndex,
    });
  };

  return (
    <div className="quiz-card">
      {readOnly ? (
        <h3 className="quiz-question">{quizData.question}</h3>
      ) : (
        <Input
          placeholder="Enter your question..."
          value={quizData.question}
          onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
        />
      )}

      <div className="quiz-options">
        <Radio.Group
          value={readOnly ? selected : quizData.correctIndex}
          onChange={(e) => handleOptionChange(e.target.value)}
          disabled={readOnly && submitted}
          className="parent-radio"
        >
          {quizData.options.map((option, index) => (
            <Radio key={index} value={index}>
              <div className="option">
                {readOnly ? (
                  option
                ) : (
                  <Input
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...quizData.options];
                      newOptions[index] = e.target.value;
                      setQuizData({ ...quizData, options: newOptions });
                    }}
                  />
                )}

                {/* Delete Button (Only in edit mode) */}
                {!readOnly && (
                  <Button
                    type="text"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => handleDeleteOption(index)}
                  />
                )}

                {/* ✅ Show "Correct" beside the correct option after submit */}
                {readOnly && submitted && index === quizData.correctIndex && (
                  <h2 className="correct-text"><CheckOutlined className="correct-tick" /></h2>
                )}
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </div>

      {!readOnly && (
        <Button
          style={{ marginTop: "8px" }}
          onClick={() => setQuizData({ ...quizData, options: [...quizData.options, "Edit me"] })}
        >
          Add Option
        </Button>
      )}

      {readOnly && (
        <Button
          style={{ marginTop: "8px" }}
          type="primary"
          disabled={selected === null || submitted}
          onClick={() => setSubmitted(true)}
        >
          Submit
        </Button>
      )}
    </div>
  );
};

export default QuizComponent;