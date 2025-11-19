package com.chat.entity;

import java.time.LocalDateTime;

import com.chat.model.CollegeModel;
import com.chat.model.DocumentModel;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Document {

	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;        // Document name
	    private String type;        // e.g., "Marksheet", "ID Proof"
	    private LocalDateTime uploadedAt;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;
	public Document() {
		// TODO Auto-generated constructor stub
	}
	public Document(Long id, String name, String type, LocalDateTime uploadedAt, User user) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.uploadedAt = uploadedAt;
		this.user = user;
	}
	public Document(String name, String type, LocalDateTime uploadedAt, User user) {
		super();
		this.name = name;
		this.type = type;
		this.uploadedAt = uploadedAt;
		this.user = user;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}
	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

	public Document(DocumentModel model) {
		this.name = model.getName();
		this.type = model.getType();
		
	}
}
