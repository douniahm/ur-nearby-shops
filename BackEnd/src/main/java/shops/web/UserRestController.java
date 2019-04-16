package shops.web;

import java.awt.print.Pageable;
import java.util.Collection;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@RequestMapping(value = "/user/shops", method = RequestMethod.GET)
	public Page<Shop> search(@RequestParam(name = "mc", defaultValue = "") String mc,
			@RequestParam(name = "page", defaultValue = "0") int page,
			@RequestParam(name = "size", defaultValue = "6") int size) {
		//Get user's shop
		Collection<Shop> shopsList = userRepo.getOne((long)1).getShops();
		//Filter list of shops
		CollectionUtils.filter(shopsList, shop -> ((Shop) shop).getNom().contains(mc));
		//Pagination
		 Page<Shop> pages = new PageImpl<Shop>((List<Shop>) shopsList);
		return pages;
	}
	
	@RequestMapping(value = "/user/shops/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable Long id) {
		User user1 = userRepo.getOne((long)1);
		Shop shop = shopRepo.getOne(id);
		//delete shop from user's likedshops
		user1.getShops().remove(shop);
		//update user
		userRepo.save(user1);
		//delete shop
		shopRepo.delete(id);
	}

}

 