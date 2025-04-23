package com.example.Community.Dto;


import com.example.Community.Entity.UserEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private String Email;
    private String NickName;
    private String User_id;

    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setNickName(userEntity.getNickName());
        userDTO.setUser_id(userEntity.getUser_id());
        return userDTO;
    }
}
