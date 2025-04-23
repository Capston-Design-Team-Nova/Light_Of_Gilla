package com.example.Community.Dto;


import com.example.Community.Entity.UserEntity;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private String email;
    private String nickName;
    private String userid;

    public static UserDTO toUserDTO(UserEntity userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail(userEntity.getEmail());
        userDTO.setNickName(userEntity.getNickName());
        userDTO.setUserid(userEntity.getUser_id());
        return userDTO;
    }
}
