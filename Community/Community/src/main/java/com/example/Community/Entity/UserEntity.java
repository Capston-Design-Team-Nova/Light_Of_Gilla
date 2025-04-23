package com.example.Community.Entity;

import com.example.Community.Dto.UserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="User")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String Email;

    @Column
    private String User_id;
    @Column
    private String NickName;

    public static UserEntity toSaveUserEntity(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setNickName(userDTO.getNickName());
        userEntity.setUser_id(userDTO.getUser_id());
        return userEntity;
    }
}
