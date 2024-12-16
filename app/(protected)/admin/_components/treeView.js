import { MdDeleteForever } from "react-icons/md";

const TreeView = ({ rootQuestion, onSelectItem, onDeleteItem }) => {
  const renderTree = (item, level = 0) => {
    return (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <div className="tree-item-container">
          <div
            className={`text-white px-2 py-1 my-2 cursor-pointer rounded-l-md flex-grow  ${
              level === 0 ? "bg-secondary-600 rounded-r-md" : "bg-warning-600"
            }`}
            onClick={() => onSelectItem(item)}
          >
            {item.title || item.label}
          </div>
          {level !== 0 && (
            <button
              className="h-full text-white bg-red-500 p-2 rounded-r-md"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item.id);
              }}
            >
              <MdDeleteForever />
            </button>
          )}
        </div>
        {item.children &&
          item.children.length > 0 &&
          item.children.map((child) => renderTree(child, level + 1))}
      </div>
    );
  };

  return (
    <div className="tree-view">
      <h2>Decision Tree</h2>
      {renderTree(rootQuestion)}
    </div>
  );
};

export default TreeView;
