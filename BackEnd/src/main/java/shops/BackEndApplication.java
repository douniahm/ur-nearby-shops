package shops;

import java.util.Collection;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import shops.dao.ShopRepository;
import shops.dao.UserRepository;
import shops.entities.Shop;
import shops.entities.User;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(BackEndApplication.class, args);

		ShopRepository srepo = ctx.getBean(ShopRepository.class);
		UserRepository urepo = ctx.getBean(UserRepository.class);

		urepo.save(new User("user1", "123"));
		urepo.save(new User("user2", "123"));

		srepo.save(new Shop("marwa", (long) 100, "marwa@mail.com", "767786"));
		srepo.save(new Shop("lc", (long) 100, "lc@lc.com", "452423"));

		urepo.findAll().forEach(c -> {
			System.out.println(c.getLogin());
			
		});
	}

}
