package com.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.entity.Document;
import com.chat.entity.User;
import com.chat.model.DocumentModel;
import com.chat.service.ActivityService;
import com.chat.service.DocumentService;
import com.chat.util.APIResponse;
import com.chat.util.SecurityUtil;

@RestController
@RequestMapping("/doc")
public class DocumentController {

	@Autowired
	private DocumentService dser;
	
	@Autowired
	private ActivityService aserv;
	
	@Autowired
	private SecurityUtil su;
	
	@PostMapping("/add")
	public ResponseEntity<APIResponse> saveLimit(@RequestBody DocumentModel model){
		 User user = su.getCurrentUser();

		    Document doc = dser.save(model, user);
		    if (doc != null) {
		        aserv.logActivity(user, "Added a new document: " + doc.getName());
		        return ResponseEntity.ok(new APIResponse("Document Added", true, doc));
		    } else {
		        return ResponseEntity.ok(new APIResponse("Document can't be added", false, null));
		    }
		}
}
