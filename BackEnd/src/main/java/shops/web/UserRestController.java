package shops.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import shops.dao.ShopRepository;
import shops.dao.UserRepository;
import shops.entities.Shop;
import shops.entities.User;

@RestController
@CrossOrigin("http://localhost:4200")
public class UserRestController {
	@Autowired //injection
	private UserRepository userRepo;
	
	@Autowired
	private ShopRepository shopRepo;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder ;
	
	@RequestMapping(value = "/sign-up", method = RequestMethod.POST)
	 public void signUp(@RequestBody User user) {
	        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
	        userRepo.save(user);
	    }
	
	@RequestMapping(value = "/like-shop", method = RequestMethod.POST)
	public ResponseEntity<String> save(@RequestBody Shop shop) {        
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepo.findByLogin(username);
        	if(!user.getShops().contains(shop)) {
        		Shop added = shopRepo.save(shop);
                user.getShops().add(added);
                userRepo.save(user);
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
        	}
        	return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
	}
	
	
	@RequestMapping(value = "/unlike-shop/{id}", method = RequestMethod.DELETE)
	public  ResponseEntity<String> delete(@PathVariable Long id) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User user = userRepo.findByLogin(username);
        Shop shop = shopRepo.findOne(id);
        	if(user.getShops().contains(shop)) {
                user.getShops().remove(shop);
                userRepo.save(user);//update user
        		shopRepo.delete(shop);//delete shop from db
                return new ResponseEntity<>(HttpStatus.ACCEPTED);
        	}
        	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}

 