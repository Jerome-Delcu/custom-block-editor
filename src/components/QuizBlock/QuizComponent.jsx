import React, { useState, useEffect } from "react";
import { Radio, Input, Button } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

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
    <div className="p-4 border rounded-md shadow-sm bg-white mt-5">
      {readOnly ? (
        <h3 className="text-base poppins font-medium">{quizData.question}</h3>
      ) : (
        <Input
          placeholder="Enter your question..."
          value={quizData.question}
          onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
        />
      )}

      <div className="mt-3 space-y-2">
        <Radio.Group
          value={readOnly ? selected : quizData.correctIndex}
          onChange={(e) => handleOptionChange(e.target.value)}
          disabled={readOnly && submitted}
          className="w-full flex flex-col gap-2"
        >
          {quizData.options.map((option, index) => (
            <Radio key={index} value={index}>
              <div className="flex items-center gap-2">
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
                  <h2 className="text-green-600 flex items-center gap-1 ml-3 font-semibold poppins"><CheckOutlined className="text-sm" /></h2>
                )}
              </div>
            </Radio>
          ))}
        </Radio.Group>
      </div>

      {!readOnly && (
        <Button
          className="mt-2"
          onClick={() => setQuizData({ ...quizData, options: [...quizData.options, "Edit me"] })}
        >
          Add Option
        </Button>
      )}

      {readOnly && (
        <Button
          className="mt-2"
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