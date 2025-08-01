package com.rapidfacto.rapidfacto.dto;

import lombok.Data;

@Data
public class UserResponseDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String type;
} 