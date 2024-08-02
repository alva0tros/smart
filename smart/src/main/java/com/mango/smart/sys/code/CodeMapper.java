package com.mango.smart.sys.code;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CodeMapper {

	List<Object> selectCodeList(Map<?, ?> params);
	
	int insertCode(Map<?, ?> params);
	
	int updateCode(Map<?, ?> params);
	
	int deleteCode(Map<?, ?> params);
	
    List<Object> selectCodeDetailList(Map<?, ?> params);
	
	int insertCodeDetail(Map<?, ?> params);
	
	int updateCodeDetail(Map<?, ?> params);
	
	int deleteCodeDetail(Map<?, ?> params);
	
}
