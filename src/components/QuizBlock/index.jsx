import React from "react";
import { createRoot } from "react-dom/client";
import QuizComponent from "./QuizComponent";

class QuizBlock {
  constructor({ data, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = data || { question: "", options: ["", ""], correctIndex: null };
    this.CSS = { wrapper: "quiz-container" };
    this.nodes = { holder: null };
  }

  static get toolbox() {
    return {
      title: "Quiz",
      icon: "❓",
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  render() {
    const rootNode = document.createElement("div");
    rootNode.classList.add(this.CSS.wrapper);
    this.nodes.holder = rootNode;

    const onDataChange = (newData) => {
      this.data = newData;
    };

    const root = createRoot(rootNode);
    root.render(
      <QuizComponent onDataChange={onDataChange} readOnly={this.readOnly} data={this.data} />
    );

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }
}

export default QuizBlock;