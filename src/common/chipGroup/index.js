import React from 'react';
import { useEffect, useState } from "react";
import styles from './chipgroup.module.css';

const ChipGroup = ({ categories, onChipSelection }) => {

  const [selectedChip, setSelectedChip] = useState('');


  const handleChipClick = (category) => {
    setSelectedChip(category);
    onChipSelection(category);
  };

  return (
    <div className={styles.chipWrapper}>
      {categories.map((category) => (
        <div
          key={category}
          className={styles.chip}
          style={{
            backgroundColor: category === selectedChip ? '#3768CE' : '#e8e8e8',
            color: category === selectedChip ? 'white' : 'black',
            // Add more styles as needed
          }}
          onClick={() => handleChipClick(category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default ChipGroup;