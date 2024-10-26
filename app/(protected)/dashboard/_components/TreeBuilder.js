import "@/app/globals.css";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionForm from "./questionForm";
import TreeView from "./treeView";
import { Button } from "@nextui-org/button";

const DecisionTreeBuilder = ({ setQuestion, question, pages }) => {
  const [rootQuestion, setRootQuestion] = useState(question || null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formMode, setFormMode] = useState("add"); // 'add', 'update', or 'addChild'

  const addRootQuestion = (title, answer) => {
    const newQuestion = {
      id: uuidv4(),
      title,
      answer,
      children: [],
    };
    setRootQuestion(newQuestion);
    setFormMode("update");
    setSelectedItem(newQuestion);
  };

  useEffect(() => {
    if (rootQuestion) {
      setQuestion(rootQuestion);
    } else {
      setQuestion(null);
    }
  }, [rootQuestion, setQuestion]);

  useEffect(() => {
    if (question) {
      setRootQuestion(question);
      setFormMode("update");
      setSelectedItem(question);
    }
  }, [question]);
  const addChild = (parentId, label, answer) => {
    const newChild = {
      id: uuidv4(),
      label,
      answer,
      children: [],
    };
    setRootQuestion((prevRoot) =>
      updateTreeRecursive(prevRoot, parentId, (item) => ({
        ...item,
        children: [...item.children, newChild],
      }))
    );
    setFormMode("update");
    setSelectedItem(null);
  };

  const updateItem = (itemId, title, answer) => {
    setRootQuestion((prevRoot) =>
      updateTreeRecursive(prevRoot, itemId, (item) => ({
        ...item,
        title: title || item.title,
        label: title || item.label,
        answer: answer || item.answer,
      }))
    );
    setFormMode("update");
    setSelectedItem(null);
  };

  const deleteItem = (itemId) => {
    setRootQuestion((prevRoot) => {
      const deleteRecursive = (item) => {
        if (item.children) {
          item.children = item.children
            .filter((child) => child.id !== itemId)
            .map((child) => deleteRecursive(child));
        }
        return item;
      };
      return deleteRecursive({ ...prevRoot });
    });
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(null);
      setFormMode("update");
    }
  };

  const updateTreeRecursive = (item, id, updateFn) => {
    if (item.id === id) {
      return updateFn(item);
    }
    if (item.children && item.children.length > 0) {
      return {
        ...item,
        children: item.children.map((child) =>
          updateTreeRecursive(child, id, updateFn)
        ),
      };
    }
    return item;
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setFormMode("update");
  };

  const handleAddChildClick = () => {
    setFormMode("addChild");
  };

  return (
    <div className="container">
      <h1>Decision Tree Builder</h1>
      <div className="content">
        <div className="left-panel">
          {!rootQuestion ? (
            <QuestionForm onSubmit={addRootQuestion} mode="add" pages={pages} />
          ) : (
            <>
              <QuestionForm
                pages={pages}
                onSubmit={
                  formMode === "addChild"
                    ? (label, answer) =>
                        addChild(selectedItem.id, label, answer)
                    : null
                }
                onUpdate={updateItem}
                selectedItem={selectedItem}
                mode={formMode}
              />
              {selectedItem && (
                <Button color="secondary" onPress={handleAddChildClick}>
                  Add Option
                </Button>
              )}
            </>
          )}
        </div>
        <div className="right-panel">
          {rootQuestion && (
            <TreeView
              rootQuestion={rootQuestion}
              onSelectItem={handleSelect}
              onDeleteItem={deleteItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DecisionTreeBuilder;
