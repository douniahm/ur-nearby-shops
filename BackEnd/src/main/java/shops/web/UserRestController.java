package shops.web;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import shops.dao.UserRepository;
import shops.entities.User;

@RestController
@CrossOrigin("*")
public class UserRestController {
	@Autowired
	private UserRepository repo;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> getUsers() {
		return repo.findAll();
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET) // {id} pathvariable
	public User getUser(@PathVariable Long id) {
		return repo.findOne(id);
	}

	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public User save(@RequestBody User User) { // requestbody cad il cherche dans le body de la requette il
												// requepère l objet sous format json et le stock dans
												// User c
		return repo.save(User);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public void supprimer(@PathVariable Long id) {
		repo.delete(id);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
	public User update(@PathVariable Long id, @RequestBody User User) {
		User.setId(id);
		return repo.save(User);
	}
	
	@GetMapping(produces = "application/json")
	@RequestMapping({ "/validateLogin" })
	public User validateLogin() {
		return new User("User successfully authenticated");
	}


}

 