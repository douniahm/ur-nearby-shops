package shops.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import shops.entities.Shop;

public interface ShopRepository extends JpaRepository<Shop,Long>{
	//Get shops not liked by the user and ordered by distance
	public Page<Shop> findByIdNotInOrderByDistanceAsc(List<Long> list, Pageable p);
}
