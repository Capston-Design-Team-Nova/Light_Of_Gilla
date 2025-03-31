import React, { useState } from 'react';
import { Container, Label,Select } from '../../styles/CustomSelectStyles';
//import { Container, Label,Select,Message } from '../../styles/CustomSelectStyles';

// 증상 목록 배열
const symptoms = [
  "두통", "기침", "발열", "목 아픔", "피로감", 
  "구토", "설사", "식욕 부진", "어지러움", "근육통", 
  "콧물", "코막힘", "숨가쁨", "가슴 통증", "발한", 
  "구역질", "불면증", "체중 감소", "배탈", "호흡 곤란"
];

// CustomSelect 컴포넌트
const CustomSelect = ({ onChange }) => {
  const [selectedSymptom, setSelectedSymptom] = useState("");

  // 증상 선택 시 처리 함수
  const handleSelectChange = (e) => {
    const value = e.target.value;
    console.log("선택한 증상:", value); 
    setSelectedSymptom(value);
    onChange(value); 
  };

  return (
    <Container>
      <Label htmlFor="symptom-select">증상 선택</Label>
      <Select
        id="symptom-select"
        value={selectedSymptom}
        onChange={handleSelectChange}
      >
        <option value="">증상을 선택하세요</option>
        {symptoms.map((symptom, index) => (
          <option key={index} value={symptom}>
            {symptom}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default CustomSelect;