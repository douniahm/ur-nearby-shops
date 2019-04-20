package shops.entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class User implements Serializable{
	@Id @GeneratedValue
	private Long id;
	private String login;
	private String password;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name="users_shops",joinColumns =
	@JoinColumn(name = "id_user"),
	inverseJoinColumns = @JoinColumn(name = "id_shop"))
	private Collection<Shop> shops;
	public User() {
		
	}
	public User(String login, String password) {
		this.login = login;
		this.password = password;
	}
	public User(Long id, String login, String password) {
		this.id = id;
		this.login = login;
		this.password = password;
	}
	public User(String status) {}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getLogin() {
		return login;
	}
	public void setLogin(String login) {
		this.login = login;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Collection<Shop> getShops() {
		return shops;
	}
	public void setShops(Collection<Shop> shops) {
		this.shops = shops;
	}
	@Override
	public String toString() {
		return "User [id=" + id + ", login=" + login + ", password=" + password + "]";
	}
	/*@Id @GeneratedValue
	private Long id;
	private String login;
	private String password;
	@ManyToMany()
	@JoinTable(name="users_shops",joinColumns =
	@JoinColumn(name = "id_user"),
	inverseJoinColumns = @JoinColumn(name = "id_shop"))
	private Collection<Shop> shops;*/

}
