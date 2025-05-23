// CustomSelect.js
import React, {useState} from 'react';
import Select from 'react-select';
import { Container, Label } from '../../styles/CustomSelectStyles';

const symptoms = [
  "두통", "기침", "발열", "목 아픔", "피로감",
  "구토", "설사", "식욕 부진", "어지러움", "근육통",
  "콧물", "코막힘", "숨가쁨", "가슴 통증", "발한",
  "구역질", "불면증", "체중 감소", "배탈", "호흡 곤란", "기타"
];

// 옵션 객체로 변환
const options = symptoms.map(symptom => ({
  value: symptom,
  label: symptom
}));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '200px',  
    border: state.isFocused
      ? '2px solid #FFC86A' // ✅ 포커스 시 주황색 테두리
      : '1px solid #999999',   // 일반 상태의 테두리
    borderRadius: '5px',
    padding: '2px',
    fontSize: '1rem',
    fontFamily: 'Arial',
    cursor: 'pointer',
    boxShadow: 'none', // ✅ react-select가 기본으로 넣는 파란 glow 제거
    '&:hover': {
      borderColor: '#FFC86A', // ✅ 호버 시도 주황색 테두리
    }
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#FFD89C' : 'white',
    color: 'black',
    cursor: 'pointer',
    fontSize: '1.1rem',
    
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'black'  // ✅ placeholder 문구 색을 검정으로!
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#4F4F4F',             // ✅ 화살표 색상
    '&:hover': {
      color: '#4F4F4F',
    }
  })
};

const CustomSelect = ({ onChange, menuPlacement= "bottom"}) => {
  const [selectedOption, setSelectedOption] = useState(null); // ✅ 상태 정의

  const handleChange = (option) => {
    setSelectedOption(option);            // ✅ 선택한 옵션 전체 저장
    onChange(option);               // ✅ 부모에 값만 전달
  };

  return (
    <Container>
      
      <Select
        options={options}
        onChange={handleChange}
        styles={customStyles}
        placeholder="증상을 선택하세요"
        isSearchable={false} // 검색창 제거 (선택사항)
        value={selectedOption}
        name="symptom"
        menuPlacement={menuPlacement}
      />
    </Container>
  );
};

export default CustomSelect;
