package com.chat.model;

import com.chat.entity.Role;

public class LoginResponseModel {

	private String firstName;
	private Role role;
	private String token;
	
	public LoginResponseModel() {
		// TODO Auto-generated constructor stub
	}

	

	

	public LoginResponseModel(String firstName, Role role, String token) {
		super();
		this.firstName = firstName;
		this.role = role;
		this.token = token;
	}





	public String getFirstName() {
		return firstName;
	}





	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}





	public Role getRole() {
		return role;
	}





	public void setRole(Role role) {
		this.role = role;
	}





	public String getToken() {
		return token;
	}





	public void setToken(String token) {
		this.token = token;
	}





	

	
}
