import { useState } from "react";

interface DraggableProps {
  id: string | number;
  onDragStart?: (draggedId: number | string) => void;
  onDrop?: (draggedId: number | string, droppedId: number | string) => void;
  onDragOver?: (event: React.DragEvent) => void;
  children: React.ReactNode;
  className?: string;
  draggingClassName?: string;
}

const Draggable: React.FC<DraggableProps> = ({
  id,
  onDragStart,
  onDragOver,
  onDrop,
  children,
  className = "",
  draggingClassName = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("draggedId", id.toString());
    if (onDragStart) onDragStart(id);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("draggedId");
    setIsDragging(false);
    if (onDrop) onDrop(draggedId, id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDragOver) onDragOver(e);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      className={`${className} ${isDragging ? draggingClassName : ""}`}
    >
      {children}
    </div>
  );
};

export default Draggable;
