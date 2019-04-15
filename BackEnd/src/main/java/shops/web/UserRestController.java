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

import shops.dao.ShopRepository;
import shops.dao.UserRepository;
import shops.entities.Shop;
import shops.entities.User;

@RestController
@CrossOrigin("*")
public class UserRestController {
	@Autowired //injection
	private UserRepository userRepo;
	
	@Autowired
	private ShopRepository shopRepo;
	
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> getUsers() {
		return userRepo.findAll();
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.GET) // {id} path variable
	public User getUser(@PathVariable Long id) {
		return userRepo.findOne(id);
	}

	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public User save(@RequestBody User User) { 
		return userRepo.save(User);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.DELETE)
	public void supprimer(@PathVariable Long id) {
		userRepo.delete(id);
	}

	@RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
	public User update(@PathVariable Long id, @RequestBody User User) {
		User.setId(id);
		return userRepo.save(User);
	}
	
	@GetMapping(produces = "application/json")
	@RequestMapping({ "/validateLogin" })
	public User validateLogin() {
		return new User("User successfully authenticated");
	}
	
	@RequestMapping(value = "/user/shop", method = RequestMethod.POST)
	public Shop save(@RequestBody Shop shop) {
		Shop addedShop = shopRepo.save(shop); 
		User user1 = userRepo.getOne((long)1);
		user1.getShops().add(addedShop);
		userRepo.save(user1);
		return addedShop;
	}

}

 