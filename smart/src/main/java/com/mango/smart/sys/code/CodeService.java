package com.mango.smart.sys.code;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mango.smart.config.security.SecurityUtil;

@Service("codeService")
public class CodeService {

	@Autowired
	private CodeMapper codeMapper;

	public List<Object> selectCodeList(Map<String, Object> params) throws Exception {
		return codeMapper.selectCodeList(params);
	}

	public int transactionCode(List<Map<String, Object>> params) throws Exception {
		int trxCnt = 0;
		int user_id = SecurityUtil.getUserId();

		for (Map<String, Object> map : params) {
			String status = (String) map.get("status");

			if (status != null) {
				map.put("user_id", user_id);
				if (status.equals("insert")) { trxCnt += codeMapper.insertCode(map); }
				if (status.equals("update")) { trxCnt += codeMapper.updateCode(map); }
				if (status.equals("delete")) { trxCnt += codeMapper.deleteCode(map); }
			}
		};
		return trxCnt;
	}

	public List<Object> selectCodeDetailList(Map<String, Object> params) throws Exception {
		return codeMapper.selectCodeDetailList(params);
	}

	public int transactionCodeDetail(List<Map<String, Object>> params) throws Exception {
		int trxCnt = 0;
		int user_id = SecurityUtil.getUserId();

		for (Map<String, Object> map : params) {
			String status = (String) map.get("status");

			if (status != null) {
				map.put("user_id", user_id);
				if (status.equals("insert")) { trxCnt += codeMapper.insertCodeDetail(map); }
				if (status.equals("update")) { trxCnt += codeMapper.updateCodeDetail(map); }
				if (status.equals("delete")) { trxCnt += codeMapper.deleteCodeDetail(map); }
			}
		};
		return trxCnt;
	}

}
