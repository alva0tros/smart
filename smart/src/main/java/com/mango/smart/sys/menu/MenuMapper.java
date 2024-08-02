package com.mango.smart.sys.menu;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MenuMapper {

	List<Object> selectMenuList(Map<?, ?> params);
	
	int insertMenu(Map<?, ?> params);
	
	int updateMenu(Map<?, ?> params);
	
	int deleteMenu(Map<?, ?> params);
	
}
