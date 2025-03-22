package com.example.Community.Dto;

import com.example.Community.Entity.CategoryEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor//기본생성자
@AllArgsConstructor//모든 필드를 매개변수로 하는 생성자
public class CategoryDTO {
    private int category_id;
    private String category_name;

    public static  CategoryDTO toCategoryDTO (CategoryEntity categoryEntity) {
        CategoryDTO categoryDTO=new CategoryDTO();
        categoryDTO.setCategory_id(categoryEntity.getCategory_id());
        categoryDTO.setCategory_name(categoryEntity.getCategory_name());
        return categoryDTO;
    }


}
