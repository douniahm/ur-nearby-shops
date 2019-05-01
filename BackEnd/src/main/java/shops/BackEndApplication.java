package shops;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import shops.dao.ShopRepository;
import shops.entities.Shop;

@SpringBootApplication
public class BackEndApplication {
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(BackEndApplication.class, args);

		ShopRepository shrepo = ctx.getBean(ShopRepository.class);
	
	}

}
