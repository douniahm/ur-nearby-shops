package shops.web;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import shops.dao.UserRepository;
import shops.entities.Shop;


@RestController
@CrossOrigin( "http://localhost:4200")
public class ShopRestController {
	@Autowired //injection
	private UserRepository userRepo;
	
	@RequestMapping(value = "/liked-shops", method = RequestMethod.GET)
	public Page<Shop> search(@RequestParam(name = "mc", defaultValue = "") String mc) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
		//Get user's shop
		Collection<Shop> shopsList = userRepo.findByLogin(username).getShops();
		//Filter list of shops
		CollectionUtils.filter(shopsList, shop -> ((Shop) shop).getNom().contains(mc));
		//Pagination
		 Page<Shop> pages = new PageImpl<Shop>((List<Shop>) shopsList);
		return pages;
	}
}
