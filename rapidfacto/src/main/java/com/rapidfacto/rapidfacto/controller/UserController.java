package com.rapidfacto.rapidfacto.controller;

import com.rapidfacto.rapidfacto.dto.ApiResponse;
import com.rapidfacto.rapidfacto.dto.UserRequestDto;
import com.rapidfacto.rapidfacto.dto.UserResponseDto;
import com.rapidfacto.rapidfacto.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserResponseDto>> signup(@Valid @RequestBody UserRequestDto userRequestDto) {
        UserResponseDto userResponseDto = userService.signup(userRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(userResponseDto, "User registered successfully"));
    }
} 