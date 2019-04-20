package shops.entities;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Shop implements Serializable{
	@Id @GeneratedValue
	private Long id;
	private String nom;
	private Long distance;
	private String email;
	private String tel;
	 @ManyToMany(mappedBy = "shops",  fetch = FetchType.LAZY ) // cascade = CascadeType.ALL,
		private Collection<User> users;

	public Shop() {		
	}
	public Shop (String nom, Long distance, String email, String tel) {
		super();
		this.nom = nom;
		this.distance = distance;
		this.email = email;
		this.tel = tel;
	}
	public Shop(Long id, String nom, Long distance, String email, String tel) {
		super();
		this.id = id;
		this.nom = nom;
		this.distance = distance;
		this.email = email;
		this.tel = tel;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public Long getDistance() {
		return distance;
	}
	public void setDistance(Long distance) {
		this.distance = distance;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	
	@Override
	public String toString() {
		return "Shop [id=" + id + ", nom=" + nom + ", distance=" + distance + ", email=" + email + ", tel=" + tel + "]";
	}
	/*   @ManyToMany(mappedBy = "shops",  cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Collection<User> users;
	*/
}
