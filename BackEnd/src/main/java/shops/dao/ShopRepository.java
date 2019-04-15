package shops.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import shops.entities.Shop;

public interface ShopRepository extends JpaRepository<Shop,Long>{
	@Query("select shop from Shop shop where shop.nom like :x")
	public Page<Shop> chercherParMC(@Param("x")String mc, Pageable p); 
}
