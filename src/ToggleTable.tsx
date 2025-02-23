import React, { useState, ReactNode } from "react";
import "./index.css";

type ImageSeries = {
  id: string;
  name: string;
};

type ModalityData = {
  modality: string;
  imageSeries: ImageSeries[];
};

type CollapsibleMenuProps = {
  data: ModalityData[];
  columns?: number;
  width?: string;
  renderItem?: (item: ImageSeries) => ReactNode;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
};

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  data,
  columns = 1,
  width = "250px",
  renderItem,
  openIcon = "-",
  closeIcon = "+",
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (modality: string) => {
    setOpenItems((prev) =>
      prev.includes(modality)
        ? prev.filter((item) => item !== modality)
        : [...prev, modality]
    );
  };

  return (
    <div className="collapsible-menu-container" style={{ width }}>
      {data.map((modalityData) => {
        const isOpen = openItems.includes(modalityData.modality);
        return (
          <div key={modalityData.modality} className="collapsible-item">
            <div
              className="menu-header"
              onClick={() => toggleItem(modalityData.modality)}
            >
              <span className="toggle-icon">
                {isOpen ? openIcon : closeIcon}
              </span>
              <span>{modalityData.modality}</span>
            </div>
            {isOpen && (
              <div className="menu-content" style={{ columnCount: columns }}>
                {modalityData.imageSeries.map((item) => (
                  <div key={item.id} className="menu-item">
                    {renderItem ? renderItem(item) : item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CollapsibleMenu;
