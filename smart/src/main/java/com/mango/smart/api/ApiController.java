package com.mango.smart.api;

import java.lang.reflect.Method;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

	@Autowired
	private ApplicationContext context;

	@PostMapping("/api")
	public ResponseEntity<Object> handleRequest(@RequestBody Map<?, ?> params) throws Exception {
		
		System.out.println(params.toString());
		
		String beanId = (String) params.get("beanId");
		String method = (String) params.get("method");
		String type = (String) params.get("type");

		Object serviceBean = context.getBean(beanId);
		Method serviceMethod = serviceBean.getClass().getMethod(method, Map.class);
		
		Object map = null;
		
		if (type.equals("find")) {
			map = params.get("findData");
		} else if (type.equals("save")) {
			map = params.get("saveData");
		}

		Object result = serviceMethod.invoke(serviceBean, map);

		return ResponseEntity.ok(result);
	}
}
