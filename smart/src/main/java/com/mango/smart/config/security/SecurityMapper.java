package com.mango.smart.config.security;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SecurityMapper {
    SecurityUser selectUserByUsername(String username);
//    List<String> findRolesByUserId(@Param("userId") Long userId);
}