package shops.web;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import shops.dao.ShopRepository;
import shops.dao.UserRepository;
import shops.entities.Shop;


@RestController
public class ShopRestController {
	@Autowired //injection
	private UserRepository userRepo;
	@Autowired
	private ShopRepository shopRepo;
	
	//Get Shops
	@RequestMapping(value = "/shops", method = RequestMethod.GET)
	public Page<Shop> getShops(@RequestParam(name = "page", defaultValue = "0") int page) {
		//Get connected user
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String username = auth.getName();
		//Get user's shops
		List<Long> shopsList = userRepo.findByLogin(username).getLikedShopsIds();	
		return shopRepo.findByIdNotInOrderByDistanceAsc(shopsList, new PageRequest(page, 3)); //each page contains 3 shops
	}
	
	//getLikedShops
	@RequestMapping(value = "/liked-shops", method = RequestMethod.GET)
	public Page<Shop> getLikedShops(@RequestParam(name = "mc", defaultValue = "") String mc) {
		//Get connected user
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
		//Get user's shop
		Collection<Shop> shopsList = userRepo.findByLogin(username).getShops();
		//Filter list of shops
		CollectionUtils.filter(shopsList, shop -> ((Shop) shop).getNom().contains(mc));
		 Page<Shop> pages = new PageImpl<Shop>((List<Shop>) shopsList);
		return pages;
	}
}
