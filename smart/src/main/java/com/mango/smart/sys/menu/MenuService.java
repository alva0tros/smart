package com.mango.smart.sys.menu;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mango.smart.config.security.SecurityUtil;

@Service("menuService")
public class MenuService {
	
	@Autowired
	private MenuMapper menuMapper;
	
	public List<Object> selectMenuList(Map<String, Object> params) throws Exception {
		return menuMapper.selectMenuList(params);
	}
	
	public int transactionMenu(List<Map<String, Object>> params) throws Exception {
		
		int trxCnt = 0;
		int user_id = SecurityUtil.getUserId();
		
		for (Map<String, Object> map : params) {
			String status = (String) map.get("status");

	        if (status != null) {
	        	map.put("user_id", user_id);
	        	if (status.equals("insert")) { trxCnt += menuMapper.insertMenu(map); }
	        	if (status.equals("update")) { trxCnt += menuMapper.updateMenu(map); }
	        	if (status.equals("delete")) { trxCnt += menuMapper.deleteMenu(map); }
	        }
		};
		return trxCnt;
    }
	
}
